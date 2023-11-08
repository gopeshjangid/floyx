interface ChatItemType {
  id?: string | number;
  img?: string | StaticImageData;
  username?: string;
  userId?: string;
  hour?: string;
  description?: string;
}

type NotificationCardType = {
  id: string;
  title: string;
  hour: string;
  img: StaticImageData;
  icon: StaticImageData;
};
