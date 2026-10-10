// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Crowdfunding
/// @author Alfred Antony M (711523BCB007)
/// @notice Multiple users contribute Ether toward a predefined project.
///         Funds are released to the owner only when the goal is met by the deadline.
///         If the goal is not met, every contributor can reclaim their contribution.
contract Crowdfunding {

    // -------------------------------------------------------------------------
    // Enums
    // -------------------------------------------------------------------------
    enum Status { Active, Successful, Failed }

    // -------------------------------------------------------------------------
    // State variables
    // -------------------------------------------------------------------------
    address public immutable owner;          // project creator, may withdraw funds
    string  public projectName;              // name of the predefined project
    uint256 public immutable goal;           // target amount in wei
    uint256 public immutable deadline;       // unix timestamp when funding closes
    uint256 public totalRaised;              // running total of wei contributed
    bool    public fundsWithdrawn;           // true after owner withdraws (one-time)

    mapping(address => uint256) public contributions; // wei per contributor address
    address[] public contributors;                    // unique contributor addresses

    // -------------------------------------------------------------------------
    // Events
    // -------------------------------------------------------------------------
    event ContributionReceived(address indexed contributor, uint256 amount, uint256 totalRaised);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event RefundIssued(address indexed contributor, uint256 amount);

    // -------------------------------------------------------------------------
    // Modifiers
    // -------------------------------------------------------------------------
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    /// @param _projectName       Name of the project
    /// @param _goalInWei         Funding target in wei (e.g. 5000000000000000000 = 5 ETH)
    /// @param _durationInMinutes Campaign length in minutes
    constructor(
        string memory _projectName,
        uint256 _goalInWei,
        uint256 _durationInMinutes
    ) {
        require(_goalInWei > 0,         "Goal must be greater than 0");
        require(_durationInMinutes > 0, "Duration must be greater than 0");
        owner       = msg.sender;
        projectName = _projectName;
        goal        = _goalInWei;
        deadline    = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    // -------------------------------------------------------------------------
    // State-changing functions
    // -------------------------------------------------------------------------

    /// @notice Contribute Ether to the project before the deadline.
    function contribute() external payable {
        require(block.timestamp < deadline, "Campaign has ended");
        require(msg.value > 0,             "Contribution must be greater than 0");

        // Track unique contributors
        if (contributions[msg.sender] == 0) {
            contributors.push(msg.sender);
        }
        contributions[msg.sender] += msg.value;
        totalRaised               += msg.value;

        emit ContributionReceived(msg.sender, msg.value, totalRaised);
    }

    /// @notice Owner withdraws all funds once the goal is reached after the deadline.
    /// @dev    Checks-Effects-Interactions: fundsWithdrawn set before the transfer.
    function withdrawFunds() external onlyOwner {
        require(block.timestamp >= deadline, "Campaign still active");
        require(totalRaised >= goal,         "Goal not reached");
        require(!fundsWithdrawn,             "Funds already withdrawn");

        fundsWithdrawn  = true;                        // effect before interaction
        uint256 amount  = address(this).balance;

        (bool sent, ) = payable(owner).call{value: amount}("");
        require(sent, "Transfer failed");

        emit FundsWithdrawn(owner, amount);
    }

    /// @notice Contributor reclaims their contribution if the goal was not reached.
    /// @dev    Checks-Effects-Interactions: balance zeroed before the transfer (re-entrancy safe).
    function refund() external {
        require(block.timestamp >= deadline, "Campaign still active");
        require(totalRaised < goal,          "Goal reached, no refund");

        uint256 amount = contributions[msg.sender];
        require(amount > 0, "No contribution found");

        contributions[msg.sender] = 0;                 // effect before interaction

        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Refund failed");

        emit RefundIssued(msg.sender, amount);
    }

    // -------------------------------------------------------------------------
    // View / pure functions (free — no transaction needed)
    // -------------------------------------------------------------------------

    /// @notice Seconds remaining until the deadline; 0 if the campaign has ended.
    function timeLeft() external view returns (uint256) {
        if (block.timestamp >= deadline) return 0;
        return deadline - block.timestamp;
    }

    /// @notice Number of unique addresses that have contributed.
    function getContributorsCount() external view returns (uint256) {
        return contributors.length;
    }

    /// @notice Current campaign status.
    function getStatus() external view returns (Status) {
        if (block.timestamp < deadline)  return Status.Active;
        if (totalRaised >= goal)         return Status.Successful;
        return Status.Failed;
    }
}
