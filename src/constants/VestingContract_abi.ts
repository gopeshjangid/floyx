export const vestingContractabi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '_token',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'AdminAlreadyExists',
        type: 'error',
    },
    {
        inputs: [],
        name: 'AdminCanNotRemoveHimself',
        type: 'error',
    },
    {
        inputs: [],
        name: 'AdminDoesNotExists',
        type: 'error',
    },
    {
        inputs: [],
        name: 'AirdropSheduleExists',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_beneficiary',
                type: 'address',
            },
        ],
        name: 'AllTokensAreReleleased',
        type: 'error',
    },
    {
        inputs: [],
        name: 'AlreadyVoted',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidRound',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NoTokensToRelease',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ReceiverShouldNotBeAddressZero',
        type: 'error',
    },
    {
        inputs: [],
        name: 'TokenCanNotBeMintedToAdmins',
        type: 'error',
    },
    {
        inputs: [],
        name: 'TokenMintingFailed',
        type: 'error',
    },
    {
        inputs: [],
        name: 'VestingNotStarted',
        type: 'error',
    },
    {
        inputs: [],
        name: 'VestingScheduleExists',
        type: 'error',
    },
    {
        inputs: [],
        name: 'VestingSheduleIsPausedByAdmins',
        type: 'error',
    },
    {
        inputs: [],
        name: 'VotingEnded',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ZeroAddress',
        type: 'error',
    },
    {
        inputs: [],
        name: 'Zero_amount',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ownerShipCouldNotBeTransferred',
        type: 'error',
    },
    {
        inputs: [],
        name: 'propsalAlreadySent',
        type: 'error',
    },
    {
        inputs: [],
        name: 'propsalNotInitialized',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: '_admin',
                type: 'address',
            },
        ],
        name: 'AdminAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: '_admin',
                type: 'address',
            },
        ],
        name: 'AdminRemoved',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'beneficiary',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'ModifyVesting',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'beneficiary',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'duration',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'slicePeriod',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'cliff',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amountTotal',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'releasedPercent',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'tgePercent',
                type: 'uint256',
            },
        ],
        name: 'addAirdrop',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'beneficiary',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'duration',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'slicePeriod',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'cliff',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amountTotal',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'releasedPercent',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'tgePercent',
                type: 'uint256',
            },
        ],
        name: 'addVesting',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'beneficiary',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'withdraw',
        type: 'event',
    },
    {
        inputs: [],
        name: 'StartVestingProposalNo',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_newAdmin',
                type: 'address',
            },
        ],
        name: 'addAdminProposal',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_newAdmin',
                type: 'address',
            },
        ],
        name: 'approveAddAdmin',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_ProposalId',
                type: 'uint256',
            },
        ],
        name: 'approvePauseVestingProposal',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_admin',
                type: 'address',
            },
        ],
        name: 'approveRemoveAdmin',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_ProposalId',
                type: 'uint256',
            },
        ],
        name: 'approveStartVestingProposal',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_beneficiary',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: '_round',
                type: 'uint8',
            },
        ],
        name: 'claimVestedToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'createPauseVestingProposal',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'createStartVestingProposal',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getAdminCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_beneficiary',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: '_round',
                type: 'uint8',
            },
        ],
        name: 'getClaimableAmount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_beneficiary',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: '_round',
                type: 'uint8',
            },
        ],
        name: 'getReleasedAmount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_beneficiary',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: '_round',
                type: 'uint8',
            },
        ],
        name: 'getSlicePeriod',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_beneficiary',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: '_round',
                type: 'uint8',
            },
        ],
        name: 'getStartTimePeriod',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getToken',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getTotalReleasedAmount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getTotalVestingAmount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_beneficiary',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: '_round',
                type: 'uint8',
            },
        ],
        name: 'getTototalSheduleAmount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'admin',
                type: 'address',
            },
        ],
        name: 'isAdmin',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'pauseProposalNo',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'paused',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_admin',
                type: 'address',
            },
        ],
        name: 'removeAdminProposal',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address[]',
                name: '_beneficiaries',
                type: 'address[]',
            },
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256',
            },
        ],
        name: 'scheduleAirdropForGroup',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_cliff',
                type: 'uint256',
            },
        ],
        name: 'setCliffPeriod',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '__durationinMonth',
                type: 'uint256',
            },
        ],
        name: 'setDuration',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '__releasePercentinMultipleof100',
                type: 'uint256',
            },
        ],
        name: 'setReleasePercent',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '_round',
                type: 'uint8',
            },
        ],
        name: 'setRound',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '__slicePeriod',
                type: 'uint256',
            },
        ],
        name: 'setSlicePeriod',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '__startTime',
                type: 'uint256',
            },
        ],
        name: 'setStartTimeOfVesting',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '__tgePercentinMuptipleof100',
                type: 'uint256',
            },
        ],
        name: 'setTgePercent',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_beneficiary',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256',
            },
        ],
        name: 'sheduleTheVesting',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_newOwner',
                type: 'address',
            },
        ],
        name: 'transferTokenOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        name: 'vestedAmountInRounds',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        name: 'vestingSchedules',
        outputs: [
            {
                internalType: 'bool',
                name: 'initialized',
                type: 'bool',
            },
            {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'duration',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'slicePeriod',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'cliff',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amountTotal',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'released',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'releasedPercent',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'tgePercent',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
