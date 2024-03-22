let topics = [  
    {title:'什么书在书店买不到?',answer:'遗书'},
    {title:'什么碗打不烂?',answer:'铁饭碗'},
    {title:'什么酒价格最贵?',answer:'喜酒'},
    {title:'胖姐生病了,他最怕来看她的人说些什么?',answer:'请多多保重'},
    {title:'一个猎人有一杆猎枪只能打一米远,一只兔子离他一百米为什么别他一枪打死了?',answer:'他的枪长99米'},
    {title:'世界上什么最大?',answer:'眼皮'},
    {title:'警察看见有人抢银行却不抓。为什么?',answer:'因为抢银行的人是在拍电影'},
    {title:'什么球离你最近?',answer:'地球'},
    {title:'有一种东西，上升的时候同时会下降下降的同时会上升，这是什么?',answer:'翘翘板'},
    {title:'13个人捉迷藏，捉了10个还剩几个?',answer:'两个'},
    {title:'什么屎不臭?',answer:'天使'},
    {title:'脑筋急转弯题目小偷从现场逃走，为什么没有留下脚印?',answer:'倒着走的'},
    {title:'从北京到天津要一小时，火车从北京开往天津，发车半小时后，问火车现在在那里?',answer:'在铁轨上'},
    {title:'有一种地方专门教坏人，但没有一个警察敢对它采取行动加以扫荡。这是什么地方?',answer:'看守所'},
    {title:'小赵买一张奖票,中了一等奖,去领奖却不给?',answer:'还没到领奖的日期'},
    {title:'一个圆画在哪里永远走不出去?',answer:'腰上'},
    {title:'什么门没有门扇?',answer:'球门'},
    {title:'什么伤医院不能治?',answer:'伤脑筋'},
    {title:'最不听话的是谁?',answer:'聋子'},
    {title:'太平洋的中间是什么?',answer:'平'},
    {title:'自讨苦吃的地方是哪?',answer:'药店'},
    {title:'小立在街上走，前面有个人掉了一块肉和一个钱包，小立为什么捡肉不捡钱包，钱包里有很多钱?',answer:'因为小立是狗'},
    {title:'一个瞎子射击一个帽子，怎么样一枪就中?',answer:'把帽子挂在枪口上'},
    {title:'有一个地方失火，可是却没人打火警电话?',answer:'因为那个地方就是消防局'},
    {title:'小李说“我前的人是小王”小王说“我前面的人是小李”怎么回事?',answer:'很简单，他们面对面的站着'},
    {title:'什么东西洗好了却不能吃?',answer:'扑克'},
    {title:'偷什么不犯法?',answer:'偷笑'},
    {title:'什么事你明明没有做却要受罚?',answer:'作业'},
    {title:'什么枪把人打跑却不伤人?',answer:'水枪'},
    {title:'网要什么时候可以提水?',answer:'当水变成冰的时候'},
    {title:'大家齐欢乐!(打一地名)?',answer:'齐齐哈尔'},
    {title:'左边是绿，右边是红，右边怕水，左边怕虫(一字)?',answer:'秋'},
    {title:'一阴一阳，一短一长，一昼一夜，合为一双(一字)?',answer:'明'},
    {title:'2木不成林!(打一字)',answer:'相'},
    {title:'什么最长?',answer:'时间'},
    {title:'一个人去网吧，碰上一个同学带着两个朋友，各带着4个小孩，小孩个带着2个朋友，问多少人去网吧?',answer:'一个人，其它人没说去。'},
    {title:'哪个寨子的人是最多的?',answer:'柬埔寨'},
    {title:'一个最小正整数,除6余5,除5余4,除4余3,除3余2?',answer:'59'},
    {title:'人最怕屁股上有什么东西?',answer:'一屁股的债'},
    {title:'三撇六竖十八横——猜一个字?',answer:'矗'},
    {title:'马的头朝南，马的尾朝那?',answer:'朝下'},
    {title:'和尚带帽子，(猜一成语)?',answer:'无法无天'},
    {title:'一个很古老的题目。把大象装进冰箱要几步?',answer:'三步，先打开冰箱，再把大象放进去，最后把冰箱门关上'},
    {title:'为什么冬天大雁要飞到南方去?',answer:'因为它只会飞呀'},
    {title:'什么人站在刀尖上生活(打一种人)?',answer:'滑冰的人'},
    {title:'有什么办法在最短的时间内打开魔方?',answer:'打碎'},
    {title:'什么“贼”不偷东西，专门卖东西?',answer:'卖国贼'},
    {title:'把火熄灭的最快方法是什么?',answer:'火上加一横'},
    {title:'风平浪静的城市是哪里?',answer:'宁波'},
    {title:'头在海里游泳，尾在天上发光?(打一字)',answer:'鲁'}
];
 

/**获取全部数据**/
function getTopicsList() {
  let list = [];
  // console.log(topics)
  for (var i = 0; i < topics.length; i++) {
    list = [];
    for (var i = 0; i < topics.length; i++) {
      let obj = {};
      obj.title = topics[i].title;
      obj.answer = topics[i].answer; 
      list.push(obj);
    }
    // console.log(list)
    return list;
  }
}
 
/**对外接口**/
module.exports = {
  getTopicsList
}