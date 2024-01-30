export const stakingContractabi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '_floyxToken',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'InsufficientApproval',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidStakingPeriod',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NoStakedTokens',
        type: 'error',
    },
    {
        inputs: [],
        name: 'StakeTimeNotEnded',
        type: 'error',
    },
    {
        inputs: [],
        name: 'YouAlreadyStacked',
        type: 'error',
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
                name: 'user',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'stakingPeriod',
                type: 'uint256',
            },
        ],
        name: 'Staked',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'reward',
                type: 'uint256',
            },
        ],
        name: 'Withdrawn',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_account',
                type: 'address',
            },
        ],
        name: 'getStakedAmount',
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
                name: '_account',
                type: 'address',
            },
        ],
        name: 'getStakingEndTime',
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
                internalType: 'uint256',
                name: '_stakingPeriodInDays',
                type: 'uint256',
            },
        ],
        name: 'getTotalStakedByPeriod',
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
        name: 'getUnallocatedAmount',
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
                name: '_account',
                type: 'address',
            },
        ],
        name: 'getUserRewardAmount',
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
        name: 'pause',
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
                internalType: 'bool',
                name: '_paused',
                type: 'bool',
            },
        ],
        name: 'pauseStake',
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
        inputs: [],
        name: 'rewardPool',
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
                internalType: 'uint256',
                name: '_minStakeAmount',
                type: 'uint256',
            },
        ],
        name: 'setMinStakeAmount',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_lockPeriod1',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_lockPeriod2',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_lockPeriod3',
                type: 'uint256',
            },
        ],
        name: 'setPeriodForStake',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_rewardRate1',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_rewardRate2',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_rewardRate3',
                type: 'uint256',
            },
        ],
        name: 'setReward',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'stakingPeriod',
                type: 'uint256',
            },
        ],
        name: 'stake',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'totalStaked',
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
                name: '',
                type: 'address',
            },
        ],
        name: 'userInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'stakingEndTime',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'stakingPeriod',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'initialized',
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
                name: '_wallet',
                type: 'address',
            },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_wallet',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256',
            },
        ],
        name: 'withdrawUnAllocatedAmount',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
