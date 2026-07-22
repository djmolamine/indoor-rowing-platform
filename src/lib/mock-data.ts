export const workouts = [
  { id:1,title:"Tuesday steady row",source:"WaterRower",machineClassId:"water-resistance",verificationId:"provider-imported",sessionType:"training",distance:"10,000 m",time:"42:18",pace:"2:06.9",date:"Today, 6:42 AM" },
  { id:2,title:"Power intervals",source:"RP3",machineClassId:"dynamic",verificationId:"device-attested",sessionType:"training",distance:"6,500 m",time:"28:04",pace:"1:58.4",date:"18 Jul, 5:30 PM" },
  { id:3,title:"5K standard effort",source:"Manual",machineClassId:"air-resistance",verificationId:"photo-confirmed",sessionType:"ranking-eligible",distance:"5,000 m",time:"23:41",pace:"2:22.1",date:"16 Jul, 7:15 AM" },
  { id:4,title:"Club 2K test",source:"Concept2",machineClassId:"static-flywheel",verificationId:"organizer-verified",sessionType:"event-result",distance:"2,000 m",time:"7:12.4",pace:"1:48.1",date:"13 Jul, 6:10 PM" },
  { id:5,title:"500 m personal best",source:"Matrix",machineClassId:"air-resistance",verificationId:"provider-imported",sessionType:"personal-best",distance:"500 m",time:"1:38.2",pace:"1:38.2",date:"9 Jul, 7:05 AM" },
] as const;

export const leaderboard = [
  { rank:1,name:"Maya Chen",initials:"MC",distance:"84.2 km",change:"—" },
  { rank:2,name:"Omar Farouk",initials:"OF",distance:"78.6 km",change:"+2" },
  { rank:3,name:"Leah Martin",initials:"LM",distance:"74.1 km",change:"-1" },
  { rank:4,name:"Mohamed Djebbari",initials:"MD",distance:"62.4 km",change:"+1",current:true },
  { rank:5,name:"Jon Bell",initials:"JB",distance:"59.8 km",change:"-2" },
];
