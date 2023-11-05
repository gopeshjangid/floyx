export enum BackendStatusCode {
  EmailInUse = 'email_in_use',
  EmailNotVerfied = 'email_not_verified',
  PhoneNotVerfied = 'phone_number_did_not_verified',
  TwoStepEnabled = 'two_step_enabled',
  InvalidCredentials = 'invalid_credentials',
  UsernameInUse = 'username_in_use',
  EmailsDiffer = 'emails_differ',
  TermsNotAccepted = 'terms_not_accepted',
  PasswordNotMetRequirements = 'password_not_met_requirements',
  Success = 'success',

  UnblockFirst = 'Unable_to_follow_unblock_first',
  UserUnblockFirst = 'Unable_to_follow_user_blocked_you',

  UnblockDetails = 'Unable_to_show_detail_unblock_first',
  UserUnblockDetails = 'Unable_to_show_data_user_blocked_you',

  UnblockShareArticle = 'Unable_to_share_article_unblock_first',
  UserUnblockShareArticle = 'Unable_to_share_article_user_blocked_you',

  UnblockPost = 'Unable_to_share_post_unblock_first',

  UnblockEvents = 'Unable_to_share_event_unblock_first',
  UserUnblockEvents = 'Unable_to_share_event_user_blocked_you',

  UnblockWatchEvents = 'Unable_to_watch_event_unblock_first',
  UserUnblockWatchEvents = 'Unable_to_watch_event_user_blocked_you',

  UnblockEventNotification = 'Unable_to_set_notification_unblock_first',
  UserUnblockEventNotification = 'Unable_to_set_notification_user_blocked_you',

  UnblockMessage = 'You_blocked_user',
  UserUnblockMessage = 'User_blocked_you',

  ContentAlreadyReported = 'Already_reported',
  ContentReported = 'Content_has_been_reported_thank_you',

  UserReported = 'User_has_been_reported_thank_you'
}
