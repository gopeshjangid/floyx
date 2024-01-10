/* eslint-disable @typescript-eslint/no-extraneous-class */
export class ApiEndpoint {
  public static BasePath = process.env.NEXT_PUBLIC_BACKEND_BASE_DEV_URL || '';

  // public static BasePath = '';
  // Identity Api Start
  public static Login = ApiEndpoint.BasePath + '/api/v1/identity/signin';
  public static Login2fa =
    ApiEndpoint.BasePath + '/api/v1/identity/validate2fa';
  public static SocialLogin =
    ApiEndpoint.BasePath + '/api/v1/Identity/sociallogin';
  public static Register = ApiEndpoint.BasePath + '/api/v1/identity/signup';
  public static CheckMail = ApiEndpoint.BasePath + '/api/v1/identity/checkmail';
  public static CheckUser = ApiEndpoint.BasePath + '/api/v1/identity/checkuser';
  public static ResendVerficationToken =
    ApiEndpoint.BasePath + '/api/v1/identity/resendVerification';
  public static Enable2faFirstStep =
    ApiEndpoint.BasePath + '/api/v1/identity/enable2fa/first';
  public static Enable2faSecondStep =
    ApiEndpoint.BasePath + '/api/v1/identity/enable2fa/second';
  public static Enable2faVerifyStep =
    ApiEndpoint.BasePath + '/api/v1/identity/enable2fa/verify';
  public static Disable2fa =
    ApiEndpoint.BasePath + '/api/v1/identity/disable2fa';
  public static Settings = ApiEndpoint.BasePath + '/api/v1/identity/settings';
  public static MessageSetting =
    ApiEndpoint.BasePath + '/api/v1/Messages/settings';
  public static ChangePassword =
    ApiEndpoint.BasePath + '/api/v1/identity/changePassword';
  public static ResetPasswordCreateToken =
    ApiEndpoint.BasePath + '/api/v1/identity/resetPassword/create';
  public static ResetPasswordVerify =
    ApiEndpoint.BasePath + '/api/v1/identity/resetPassword/verify';
  public static UpdateSettings =
    ApiEndpoint.BasePath + '/api/v1/identity/settings';
  // End

  // Users Api Start
  public static CurrentUserDetails =
    ApiEndpoint.BasePath + '/api/v1/users/details';
  public static IcoDetails =
    ApiEndpoint.BasePath + '/api/v1/users/financial-ico/details';
  public static CoinDetails =
    ApiEndpoint.BasePath + '/api/v1/users/financial-coin/details';
  public static ProfileDetails = ApiEndpoint.BasePath + '/api/v1/users/details';
  public static UpdateDetails = ApiEndpoint.BasePath + '/api/v1/users/details';
  public static Follow = ApiEndpoint.BasePath + '/api/v1/users/follow';
  public static GetFollowedUsersInfo =
    ApiEndpoint.BasePath + '/api/v1/users/getFollowedUsersInfo';
  public static GetFollowersUsersInfo =
    ApiEndpoint.BasePath + '/api/v1/users/getFollowersUsersInfo';
  public static FindUserByName = ApiEndpoint.BasePath + '/api/v1/users/find';
  public static UserByName = ApiEndpoint.BasePath + '/api/v1/users/byName';
  public static GetAboutProfile = ApiEndpoint.BasePath + '/api/v1/users/about';
  public static UpdateAboutProfile =
    ApiEndpoint.BasePath + '/api/v1/users/about';
  public static AddProfileExperience =
    ApiEndpoint.BasePath + '/api/v1/users/about/experience';
  public static EditProfileExperience =
    ApiEndpoint.BasePath + '/api/v1/users/about/experience?experienceId=';
  public static DeleteProfileExperience =
    ApiEndpoint.BasePath + '/api/v1/users/about/experience/remove/';
  public static AddProfileEducation =
    ApiEndpoint.BasePath + '/api/v1/users/about/education';
  public static EditProfileEducation =
    ApiEndpoint.BasePath + '/api/v1/users/about/education?educationId=';
  public static RemoveProfileEducation =
    ApiEndpoint.BasePath + '/api/v1/users/about/education/remove/';
  public static AddProfileInvestments =
    ApiEndpoint.BasePath + '/api/v1/users/about/investment';
  public static EditProfileInvestments =
    ApiEndpoint.BasePath + '/api/v1/users/about/investment?investmentId=';
  public static RemoveProfileInvestments =
    ApiEndpoint.BasePath + '/api/v1/users/about/investment/remove/';
  public static UpdateDownloads =
    ApiEndpoint.BasePath + '/api/v1/users/about/downloads';
  public static GetAdvisorMembers =
    ApiEndpoint.BasePath + '/api/v1/users/members/advisor';
  public static GetTeamMembers =
    ApiEndpoint.BasePath + '/api/v1/users/members/team';
  public static CreateMember = ApiEndpoint.BasePath + '/api/v1/users/members';
  public static AccountsToFallow =
    ApiEndpoint.BasePath + '/api/v1/users/accounts';
  public static UserMilestones =
    ApiEndpoint.BasePath + '/api/v1/users/milestones';
  public static SearchPeople = ApiEndpoint.BasePath + '/api/v1/users/people';
  public static SearchIcos = ApiEndpoint.BasePath + '/api/v1/users/ico';
  public static CoinPeople = ApiEndpoint.BasePath + '/api/v1/users/coin';
  public static TopCoinsApi = ApiEndpoint.BasePath + '/api/v1/Users/about/top';
  public static FavoriteCoinsApi =
    ApiEndpoint.BasePath + '/api/v1/Users/coin/favorite';
  public static CoinsListApi =
    ApiEndpoint.BasePath + '/api/v1/Users/about/currencylist';
  public static AvatarDefault = ApiEndpoint.BasePath + '/share/avatar.png';
  public static BackgroundDefault =
    ApiEndpoint.BasePath + '/share/background-default.png';
  public static GetBlockedUsers =
    ApiEndpoint.BasePath + '/api/v1/users/getBlockedUsers';
  public static UnblockedUsers = ApiEndpoint.BasePath + '/api/v1/users/unblock';
  public static BlockUser = ApiEndpoint.BasePath + '/api/v1/users/block';
  public static IsUserBlocked =
    ApiEndpoint.BasePath + '/api/v1/users/isUserBlocked';
  public static UserWallet =
    ApiEndpoint.BasePath + '/api/v1/Earnings/getUserWallet';
  public static UserArticleTipHistory =
    ApiEndpoint.BasePath + '/api/v1/Earnings/userArticleTipHistory';
  public static UserTipHistory =
    ApiEndpoint.BasePath + '/api/v1/Earnings/userTipHistory';
  public static ArticleTotalEarning =
    ApiEndpoint.BasePath + '/api/v1/Earnings/getArticleTotalEarning';
  public static ActiveCurrency =
    ApiEndpoint.BasePath + '/api/v1/Earnings/getActiveCurrency';
  public static IsEarningStopped =
    ApiEndpoint.BasePath + '/api/v1/Earnings/isEarningStopped';
  public static DailyTaskStatus =
    ApiEndpoint.BasePath + '/api/v1/Tasks/getDailyTaskStatus';
  public static CompletedTaskHistory =
    ApiEndpoint.BasePath + '/api/v1/Tasks/getCompletedTaskHistory';
  public static BonusTaskStatus =
    ApiEndpoint.BasePath + '/api/v1/Tasks/getBonusTaskStatus';
  public static isUserFollowedBy =
    ApiEndpoint.BasePath + '/api/v1/Users/isUserFollowedBy';

  // End

  // Tags Api Start
  public static GetPopularTags =
    ApiEndpoint.BasePath + '/api/v1/Articles/popularTags';
  public static GetArticleByTag =
    ApiEndpoint.BasePath + '/api/v1/Articles/getArticlesByTag';
  public static SearchArticle =
    ApiEndpoint.BasePath + '/api/v1/Articles/searchArticles';
  public static SearchTag = ApiEndpoint.BasePath + '/api/v1/Articles/searchTag';

  //End
  // Post Api Start
  public static AddNewPost = ApiEndpoint.BasePath + '/api/v1/posts';
  public static GetPosts = ApiEndpoint.BasePath + '/api/v1/posts';
  public static LikePost = ApiEndpoint.BasePath + '/api/v1/posts/like';
  public static SharePost = ApiEndpoint.BasePath + '/api/v1/posts/share';
  public static GetFeed = ApiEndpoint.BasePath + '/api/v1/posts/feed';
  public static DeletePost = ApiEndpoint.BasePath + '/api/v1/posts';
  public static CreateWallet =
    ApiEndpoint.BasePath + '/api/v1/Earnings/createWallet';
  public static UpdateWallet =
    ApiEndpoint.BasePath + '/api/v1/Earnings/updateWallet';
  public static CreateTransaction =
    ApiEndpoint.BasePath + '/api/v1/Earnings/createTransaction';
  public static CollectDailyTaskReward =
    ApiEndpoint.BasePath + '/api/v1/Tasks/collectDailyTaskReward';
  public static CollectBonusTaskReward =
    ApiEndpoint.BasePath + '/api/v1/Tasks/collectBonusTaskReward';
  // End

  // Article Api Start
  public static CreateDraft = ApiEndpoint.BasePath + '/api/v1/articles/draft';
  public static UpdateDraft = ApiEndpoint.BasePath + '/api/v1/articles/draft';
  public static GetArticles = ApiEndpoint.BasePath + '/api/v1/articles';
  public static UploadArticleImage =
    ApiEndpoint.BasePath + '/api/v1/articles/upload';
  public static GetDrafts = ApiEndpoint.BasePath + '/api/v1/articles/draft';
  public static PublishDraft =
    ApiEndpoint.BasePath + '/api/v1/articles/publish';
  public static GetArticlesInfo =
    ApiEndpoint.BasePath + '/api/v1/articles/info';
  public static ShareArticle = ApiEndpoint.BasePath + '/api/v1/articles/share';
  public static DeleteArticle = ApiEndpoint.BasePath + '/api/v1/articles';
  public static IsSharedPost =
    ApiEndpoint.BasePath + '/api/v1/posts/share/isshared';
  public static GetRecentArticles =
    ApiEndpoint.BasePath + '/api/v1/articles/recent';
  public static GetFollowingArticles =
    ApiEndpoint.BasePath + '/api/v1/articles/following';
  public static GetPopularArticles =
    ApiEndpoint.BasePath + '/api/v1/articles/popular';
  public static GetLikedArticles =
    ApiEndpoint.BasePath + '/api/v1/articles/liked';
  public static VerifyAccount =
    ApiEndpoint.BasePath + '/api/v1/Identity/review';
  public static TipArticle =
    ApiEndpoint.BasePath + '/api/v1/Earnings/tipArticle';
  public static GetTransactionHistory =
    ApiEndpoint.BasePath + '/api/v1/Earnings/getTransactionHistory';
  public static GetArticleById =
    ApiEndpoint.BasePath + '/api/v1/articles/view/published/';
  // End

  // Event Api Start
  public static GetTimeZones =
    ApiEndpoint.BasePath + '/api/v1/events/timezones';
  public static CreateEvent = ApiEndpoint.BasePath + '/api/v1/events';
  public static ShareEvent = ApiEndpoint.BasePath + '/api/v1/events/share';
  public static GetRecentEvents =
    ApiEndpoint.BasePath + '/api/v1/events/recent';
  public static GetWatchingEvents =
    ApiEndpoint.BasePath + '/api/v1/events/watching';
  public static GetPopularEvents =
    ApiEndpoint.BasePath + '/api/v1/events/popular';
  public static GetFollowingEvents =
    ApiEndpoint.BasePath + '/api/v1/events/following';
  public static GetLikedEvents = ApiEndpoint.BasePath + '/api/v1/events/liked';
  public static GetEvent = ApiEndpoint.BasePath + '/api/v1/events';
  public static DeleteEvent = ApiEndpoint.BasePath + '/api/v1/events';
  public static EditEvent = ApiEndpoint.BasePath + '/api/v1/events';
  public static EventNotification =
    ApiEndpoint.BasePath + '/api/v1/events/notification';
  public static UpdateEvent = ApiEndpoint.BasePath + '/api/v1/events';
  public static WatchEvent = ApiEndpoint.BasePath + '/api/v1/events/watch';
  public static GetUserEvents = ApiEndpoint.BasePath + '/api/v1/events/user';
  // End

  // Comment Api Start
  public static GetComments = ApiEndpoint.BasePath + '/api/v1/comments';
  public static AddComment = ApiEndpoint.BasePath + '/api/v1/comments';
  public static DeleteComment = ApiEndpoint.BasePath + '/api/v1/comments';
  public static EditComment = ApiEndpoint.BasePath + '/api/v1/comments';
  // End

  // Message Api Start
  public static GetMessages = ApiEndpoint.BasePath + '/api/v1/messages';
  public static DeleteMessage = ApiEndpoint.BasePath + '/api/v1/messages';
  // End

  // Other Api's Start
  public static Like = ApiEndpoint.BasePath + '/api/v1/like';
  public static GetNotificationsAll =
    ApiEndpoint.BasePath + '/api/v1/notifications';
  public static PaymentApi = ApiEndpoint.BasePath + '/api/v1/payment';
  public static PaymentPriceListApi =
    ApiEndpoint.BasePath + '/api/v1/payment/pricelist';
  public static PaymentPaypalRedirect =
    ApiEndpoint.BasePath + '/api/v1/Payment/pay/paypal';
  public static PaymentCoinRedirect =
    ApiEndpoint.BasePath + '/api/v1/Payment/pay/coinpayments';
  // End

  // Report API's start
  public static ReportPost = ApiEndpoint.BasePath + '/api/v1/posts/reportPost';
  public static ReportArticle =
    ApiEndpoint.BasePath + '/api/v1/articles/reportArticle';
  public static ReportUser = ApiEndpoint.BasePath + '/api/v1/users/reportUser';

  // First time login check
  public static CheckFirstTimeLogin =
    ApiEndpoint.BasePath + '/api/v1/identity/firstlogin';
  public static FinishFirstTimeLogin =
    ApiEndpoint.BasePath + '/api/v1/identity/loginsetup';

  // Phone APIs
  public static CheckPhoneNumber =
    ApiEndpoint.BasePath + '/api/v1/identity/checkPhone';
  public static SendOTPCode = ApiEndpoint.BasePath + '/api/v1/identity/sendOtp';
  public static VerifyOTPCode =
    ApiEndpoint.BasePath + '/api/v1/identity/verifyOtp';

  // Invite APIs
  public static GetTotalInvites =
    ApiEndpoint.BasePath + '/api/v1/identity/getTotalInvites';
  public static GetInviteHistory =
    ApiEndpoint.BasePath + '/api/v1/identity/getInviteHistory';

  // referrer API
  public static SearchUsernames =
    ApiEndpoint.BasePath + '/api/v1/identity/searchUsernames';
}
