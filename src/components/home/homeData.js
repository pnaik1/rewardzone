export const homeData = [
  {
    Title: "Approvals",
    Description: "Approve Rewards",
    icon: "./images/approval.png",
  },
  {
    Title: "Manager Report",
    Description: "Team Dashboard",
    icon: "./images/manager.png",
  },
  {
    Title: "Reward History",
    Description: "My Reward History",
    icon: "./images/reward.png",
  },
  {
    Title: "My Account",
    Description: "Learn More",
    icon: "./images/myAccount.png",
  },
  {
    Title: "Nominations",
    Description: "Send and View",
    icon: "./images/nomination.png",
    isDropdown: true,
    DropdownList: [
      {
        name: "Create",
        value: "/nominations/create",
      },
      {
        name: "View",
        value: "/nominations/views",
      },
    ],
  },
  {
    Title: "Campaigns",
    icon: "./images/campaign.jpg",
    Description: "Create and view",
  },
  {
    Title: "Catalog",
    icon: "./images/catalog.png",
    Description: "Merchandise",
    isDropdown: true,
    DropdownList: [
      {
        name: "Create",
        value: "/merchandise/create",
      },
      {
        name: "View",
        value: "/merchandise/views",
      },
    ],
  },
  {
    Title: "FAQ",
    icon: "./images/FAQ.png",
    Description: "Learn more",
  },
];
