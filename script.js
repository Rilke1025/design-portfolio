/**
 * Polyfolio - 个人作品集核心交互脚本
 * 终极安全守护版：修复底层动画丢失 + 纯原图高亮频闪 + 全局滚轮支持 + 卡顿优化 + CSS变量全面接管
 */

// =========================================================================
// 🌟 【素材控制台：路径配置区】 (保留你的原本设定，一字未动)
// =========================================================================
const HOME_BG_IMAGE_PATH = 'index-Asset/some/bac.png';         
const HOME_CENTER_MAIN_PATH = 'index-Asset/some/center.png';   

const SIDE_ICON_PATHS = [
    'index-Asset/some/ai.png', 'index-Asset/some/ps.png', 'index-Asset/some/br-de.png',
    'index-Asset/some/pic-2.png', 'index-Asset/some/dy-de.png', 'index-Asset/some/gemini.png',
    'index-Asset/some/pic-3.png', 'index-Asset/some/gr-de.png',
    'index-Asset/some/lovart.png', 'index-Asset/some/ot-de.png', 'index-Asset/some/pr.png',
    'index-Asset/some/pic-1.png'
];

const FLOWER_PATHS = [
    'index-Asset/some/fo-1.png', 'index-Asset/some/fo-2.png', 'index-Asset/some/fo-3.png',
    'index-Asset/some/fo-4.png', 'index-Asset/some/fo-5.png', 'index-Asset/some/fo-6.png',
    'index-Asset/some/fo-5.png', 'index-Asset/some/fo-3.png' 
];

const BRAIN_IMAGE_PATHS = [
    'index-Asset/some/yellow.png',
    'index-Asset/some/blue.png',
    'index-Asset/some/red.png'
];

const DIZZY_LINE_IMAGE_PATH = 'index-Asset/some/xy.png';  
const DIZZY_ELEMENT_PATHS = [
    'index-Asset/some/x1.png','index-Asset/some/x2.png','index-Asset/some/x3.png',
    'index-Asset/some/x4.png','index-Asset/some/x5.png','index-Asset/some/x6.png',
]; 

const BOTTOM_TEXT_IMAGE_PATH = 'index-Asset/some/text-resume.png'; 
const BOTTOM_STROBE_PATHS = [
    'index-Asset/some/red-star.png',  
    'index-Asset/some/computer.png'    
];
const BOTTOM_EXTRA_PATHS = [
    'index-Asset/some/zl.png',
    'index-Asset/some/my.png'
];
const BULB_OFF_PATH = 'index-Asset/some/an.png';  
const BULB_ON_PATH = 'index-Asset/some/liang.png';     

// =========================================================================
// 🎛️ 【独立元素调节控制台】
// =========================================================================
const CENTER_IMG_LAYOUT = { dx: -50, dy: -110, w: 570 };       
const BRAIN_IMG_LAYOUT  = { dx: -65, dy: -360, w: 160 }; 

const DIZZY_LINE_LAYOUT = { dx: -65, dy: -420, w: 270 }; 
const PLANET_LAYOUT     = { dx: -65, dy: -435, orbitRadius: 50, w: 18 }; 

const BOTTOM_TEXT_LAYOUT= { dx: 0,   dy: 540, w: 1400 };     
const BULB_LAYOUT       = { dx: 245, dy: 570, w: 85 };       

const BOTTOM_EXTRA_LAYOUT = [
    { dx: 30, dy: 1700, w: 1500 },
    { dx: -580,  dy: 1170, w: 220 }
];

const STROBE_LAYOUT = [ 
    { dx: 150, dy: 20, w: 62 }, { dx: -310, dy: 0, w: 71 },  { dx: -50, dy: 20, w: 58 },
    { dx: -480,  dy: -160, w: 75 }, { dx: -240, dy: -220,  w: 67 },  { dx: 240, dy: -130,  w: 62 },
    { dx: 140, dy: -310,  w: 60 }, { dx: -190,  dy: -85, w: 61 },  { dx: 410,  dy: -20,  w: 53 },
    { dx: 355,  dy: -250, w: 60 }, { dx: 10,  dy: -130,  w: 62 },  { dx: -360, dy: -310,  w: 60 }
];

const FLOWER_LAYOUT = [ 
    { dx: -600, dy: 100, w: 160 }, { dx: -560, dy: -530,  w: 100 }, { dx: -800, dy: -270, w: 150 },
    { dx: 670,  dy: -230, w: 130 }, { dx: 600,  dy: 100, w: 120 }, { dx: 500,  dy: -480,  w: 135 },
    { dx: 460, dy: 1320,   w: 100 }, { dx: 250,  dy: 1070,  w: 130 }
];

const BOTTOM_STROBE_LAYOUT = [ 
    { dx: -625, dy: 440, w: 100 },  
    { dx: -5, dy: 450, w: 120 }  
];

const GLOBAL_SCALE = 1.0; 

// =========================================================================
// 📝 【1. 平面设计（Graphic Design）画廊文字矩阵】
// =========================================================================
const graphicProjectsData = {
    series: [
        { title: `达能&脉动`, desc: `这是达能脉动发起的关于职场亚健康人群以及呼吁地球生态环境的宣传系列海报；<br>分别采用了文字设计占据视觉的满版设计和矢量插画的环保设计；为整体增加趣味性和观赏性。` },
        { title: `招商银行 & 中国银行`, desc: `这部分的系列海报是不同的银行企业的线上宣传系列海报，分别是招商银行和中国银行两大银行;根据客户的需求，主要进行文字的处理和信息层级的排版，注重于企业的新活动的整体宣传；主要用于线上媒体宣传和线下地铁地广宣传。这部分的系列海报是不同的银行企业的线上宣传系列海报，分别是招商银行和中国银行两大银行;根据客户的需求，主要进行文字的处理和信息层级的排版，注重于企业的新活动的整体宣传；主要用于线上媒体宣传和线下地铁地广宣传。` },
        { title: `海霸王`, desc: `这是为台湾知名老字号海霸王设计的线上宣传海报；<br>采用复古台式风格，主打怀旧路线，利用简单线条绘制食材，沿用复古的台式风格打造复古风潮。` }
    ],
    kv: [
        { title: `万象城`, desc: `为“罗湖万象城三期”的四个主题所设计的主视觉之一《感觉来了》；<br>根据公司创意部门给出的方案，结合万象城的属性，主要诉求为时尚潮流；<br>主视觉采取大字报形式，手写体和混搭排版使画面更松弛，同时添加涂鸦笔增加趣味性，颜色上选择了荧光色系，更好地突出了画面重点，在潮流时尚外增加了亲和感，适合线下地广的铺设。` },
        { title: `招商银行`, desc: `这是招商银行与人民美术出版社联合举办的艺术展活动主视觉；<br>面对的人群是家里于小朋友的银行会员，通过亲子互动的方式维护客户；<br>采用童真的简笔画和干净明亮的色彩突出主题，将标题进行了字体设计，同时为画面人物绘制卡通涂鸦。` },
        { title: `雷蛇&合创`, desc: `为合创汽车和雷蛇数码发起的共创设计大赛方案设计的主视觉，配合创意部门进行画面构思；<br>采用了实景和绘画结合的方式，突出主题和产品，通过变形字体进行透视压缩，为画面增添视觉冲击;采用彩色的色彩和前面的黑白实景形成画面对比，同时突出天马行空的设计主题。` },
        { title: `招商银行`, desc: `招商银行位于海南的十周年主视觉，主要用于线上线下传播，地广以及用户开屏页等物料；<br>需要同时拥有海南特色和招行IP的结合,并表达庆祝的氛围，客户要求主体色系采用粉色；<br>结合了招行IP的矢量插画绘制和海南椰子作为特色,同时为此视觉配套用户头像和小程序抽奖页面等一系列平面物料。` },
        { title: `万象城`, desc: `为“罗湖万象城三期”的四个主题所设计的主视觉之一《扉页漫游计划》；<br>根据公司创意部门给出的方案，结合万象城的属性，主要诉求天马行空、复古色调的怪诞风格；<br>采取矢量插画形式，将机器拟人化，突破次元的书法以达到视觉冲击，同时色彩上采用复古色系，达成创意部门所要求的“怪诞"风格。` },
        { title: `万象城`, desc: `为“罗湖万象城三期”的四个主题所设计的主视觉之一《天生如此》；<br>根据公司创意部门给出的方案，结合万象城的属性，主要诉求追求极简和画面创意性；<br>整体画面以日本艺术家中村隆的绘画手法，采用点、线、面的平面构成完成画面的整体设计；<br>主视觉上的色系采用高明度，用于线上推广的设计。在极简之间亦能传递内容，从而进行主题的表达。` },
        { title: `万象城`, desc: `为“罗湖万象城三期”的四个主题所设计的主视觉之一《ReadMe》;<br>根据公司创意部门给出的方案，结合万象城的属性，主要诉求为亲和，内容丰富；<br>采取矢量插画形式，以“万象城”的名字形式，绘制出不同的大象形象，以此来贴合主题;画面采用纵深的视觉延伸，色彩上采用极具视觉冲击力的高饱和度颜色，以便在线下大屏展示，能有效抓住用户的视线。` }
    ],
    long: [
        { title: `雅诗兰黛&小红书`, desc: `雅诗兰黛数据号在小红书推广所需的长图设计，用户主要突出数据的可视化和宣传的整体流程化；<br>头图采用老虎机的2.5D设计，整体内容排版倾向于端正清晰，方便用户第一眼看到数据。` },
        { title: `小红书潮流趋势`, desc: `来自于对小红书家居方向的洞察向长图；客户主要想结合小红书风格，设计一张用于家居类的数据长图；<br>主要用于小红书推广，吸引同品类用户；采用矢量插画的画质，利用鲜艳的色彩头图吸引用户目光。` },
        { title: `脉动`, desc: `这是用于脉动公益公众号的宣传长图，结合脉动的“探路者计划”进行宣传内容的整理和图片整理；<br>主要突出公益计划和文字力量的输出排版，让用户参与的同时更多的关注到脉动这一商品。` },
        { title: `深圳来福士`, desc: `深圳来福士公众号宣传长图，以商场的节庆活动为切入点；<br>对现场活动、福利进行整理，并结合商场的不同商家福利进行宣传，以此来宣传更多用户。` },
        { title: `《迷宫饭》卡牌`, desc: `围绕二次元番剧《迷宫饭》里的人物及剧情展开设计的一系列卡牌；并为此设计了全系列的展示图鉴，在平台先行宣传，以丰富的卡牌内容吸引更多的消费者进行消费。` },
        { title: `《名侦探柯南》卡牌`, desc: `将柯南系列的卡牌整理并进行排版设计；绘制矢量头图，作为全系列的展示图鉴方便产品售卖时的宣发。` },
        { title: `《娃三岁》`, desc: `这是娃三岁出的第二个系列的卡牌图鉴，主要对每个系列的卡牌名称和背景进行结合，并将此进行和谐的衔接；<br>设计头图和文字，对整体风格的进行统一的把控和展示。` },
        { title: `《娃三岁》`, desc: `娃三岁的第三个系列卡牌，推出节点在新年后，主打好的寓意祝福，根据主题绘制头图和文字；<br>为不同系列的卡牌选择合适的背景和排版，使其完整且美观，同时掌控整体风格走向和不同系列的标题设计。` }
    ]
};

// =========================================================================
// 📝 【2. 品牌设计（Brand Design）项目文字矩阵】
// =========================================================================
const brandProjectsData = [
    { 
        id: 0, 
        title: `楼咖LOOKCAFE`, 
        desc: `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是坐落在深圳盈峰中心的写字楼咖啡馆，楼咖主要服务于写字楼内的白领；主打的宗旨是快、高性价比、及补给站的理念。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结合品牌理念,创造出棋盘格作为主要视觉元素进行设计。品牌色为黑白绿三种颜色组成;logo来源于品牌代理人所要推出的“6”这个元素而设计的品牌符号;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人对品牌进行了全方案的跟进,包括店内所用的餐饮包材、所需的营销海报及装饰点缀等、并为此品牌把控整体方向和调性,设计了品牌VI手册进行规范化。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;后期结合品牌调性,添加了IP设计,更有利于线上传播和拉进与用户的距离。</p>`, 
        images: ["b-asset/brand-1/look-1.jpg", "b-asset/brand-1/look-2.jpg", "b-asset/brand-1/look-3.jpg", "b-asset/brand-1/look-4.jpg", "b-asset/brand-1/look-5.jpg", "b-asset/brand-1/look-6.jpg", "b-asset/brand-1/look-7.jpg", "b-asset/brand-1/look-8.jpg","b-asset/brand-1/look-9.jpg", "b-asset/brand-1/look-10.jpg", "b-asset/brand-1/look-11.jpg", "b-asset/brand-1/look-12.jpg","b-asset/brand-1/look-13.jpg", "b-asset/brand-1/look-14.jpg", "b-asset/brand-1/look-15.jpg"] 
    },
    { 
        id: 1, 
        title: `AMPM`, 
        desc: `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是一家社区咖酒小馆的品牌全案，客户的主要诉求是设计一个门头标志用于小馆展示，同时突出早咖晚酒的含义；<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“AMPM”是小馆的名字,观察文字特性后结合酒咖的深层含义,将“A”和“P”进行咖啡豆和酒杯的变形设计,同时目标用户为年轻群体，整体采用矢量的线条插画和不规则的字体，打造纹理感，更进一步达到年轻有趣的个性化设计。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对整体品牌定下基调后便进行店内包材设计，多于餐具菜单等，同时进行小程序的页面设计；主要把控整体调性和元素统一。</p>`, 
        images: ["b-asset/brand-3/ampm-1.jpg", "b-asset/brand-3/ampm-2.jpg", "b-asset/brand-3/ampm-3.jpg", "b-asset/brand-3/ampm-4.jpg", "b-asset/brand-3/ampm-5.jpg", "b-asset/brand-3/ampm-6.jpg", "b-asset/brand-3/ampm-7.jpg", "b-asset/brand-3/ampm-8.jpg", "b-asset/brand-3/ampm-9.jpg"] 
    },
    { 
        id: 2, 
        title: `LUCKY CAPSULE`, 
        desc: `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lucky Capsule是楼咖同企业的线上零售品牌,用于线上售卖挂耳咖啡、咖啡液、咖啡豆等咖啡制品；目标用户是年轻群体，用于快速在办公室、写字楼自制咖啡的人群。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;整体风格鲜艳明亮，采用红蓝棕为品牌色；选择鲸鱼作为品牌幸运符号。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为贴近年轻群体，整体的字体和插画风格都采用了粗糙的、不规则的形状，以此达到手作感，能更进一步贴合目标用户。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于是线上销售品牌，多为线上礼盒、包装和不同咖啡的包装袋设计；掌握整体的风格和调性，跟进包材的印刷和把控，确保落地后和品牌的统一性。</p>`, 
        images: ["b-asset/brand-2/ca-1.jpg",  "b-asset/brand-2/ca-2.jpg", "b-asset/brand-2/ca-3.jpg", "b-asset/brand-2/ca-4.jpg", "b-asset/brand-2/ca-5.jpg",  "b-asset/brand-2/ca-6.jpg", "b-asset/brand-2/ca-7.jpg",  "b-asset/brand-2/ca-8.jpg"] 
    },
    { 
        id: 3, 
        title: `SEVENTH SENSE`, 
        desc: `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“第七感”是一家小众的香薰品牌委托的品牌设计,主要聚焦于品牌的logo和调性;用户想对标“观夏”的简约大气，主打留白和小众。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logo采用了简单的字体设计,采用衬线体体现品牌的优雅和简洁;设计调性上更多的使用原木色的肌理感，打造自然和舒适的氛围；<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;包装上沿用品牌的调性，将包装盒和介绍卡片都采用统一的原木色卡纸，以及贴合自然香氛的插画。</p>`, 
        images: ["b-asset/brand-4/seven-1.jpg", "b-asset/brand-4/seven-2.jpg", "b-asset/brand-4/seven-3.jpg", "b-asset/brand-4/seven-4.jpg", "b-asset/brand-4/seven-5.jpg", "b-asset/brand-4/seven-6.jpg", "b-asset/brand-4/seven-7.jpg", "b-asset/brand-4/seven-8.jpg", "b-asset/brand-4/seven-9.jpg", "b-asset/brand-4/seven-10.jpg", "b-asset/brand-4/seven-11.jpg", "b-asset/brand-4/seven-12.jpg"] 
    }
];

// =========================================================================
// 📝 【3. 其他设计（Other Design）项目文字矩阵】
// =========================================================================
const otherProjectsData = {
    ip: [
        { title: `猫猫事务所`, desc: `<p>这是基于猫咪拟人化而衍生的IP形象,主要猫物是三只不同花色的猫咪，并以此展开一个个在事务所发生的小故事；<br>将三只不同性格的猫咪进行塑造，采用矢量卡通插画的方式进行绘制；<br>风格上采用粗糙化的线条将画面塑造的更有层次和丰富感;采用的都是较为鲜艳的颜色，突出画面的温暖和明亮；场景都尽量拟人化，塑造可爱的日常以此达到共鸣。</p>`, mediaList: ["o-asset/IP/cat-1.jpg", "o-asset/IP/cat-2.jpg", "o-asset/IP/cat-3.jpg", "o-asset/IP/cat-4.jpg"] },
        { title: `LIRS`, desc: `<p>lirs是一个红头发并且自认为拥有超能力的小女孩,但其实是比较擅长感知幸福,所以会将幸福的时刻铭记很久或记录下来的人。<br>将人物进行深度的分析和定位,最终采用粗糙的画笔风格进行绘制,并绘制出人物的三视图;接着就把lirs认为美好的瞬间绘制出来,是不同时期的故事、不同的服装和发生的不同事物；为下一步的实体盲盒所做准备。</p>`, mediaList: ["o-asset/IP/lirs-1.jpg", "o-asset/IP/lirs-2.jpg", "o-asset/IP/lirs-3.jpg"] }
    ],
    card: [
        { title: `迷宫饭`, desc: `<p>该卡牌的部分卡面展示<br>一套卡牌为24-26个卡位,1卡位为1系列,分别有9-12张卡牌<br>围绕着系列进行设计并结合市场上的不同卡牌工艺，绘制不同的卡面。<br>迷宫饭由我独立设计的24个卡位,卡面量高达300张,对不同工艺、材料进行分析，同时对番剧的人物进行解读，将插画和卡位进行结合制作而出。</p>`, mediaList: ["o-asset/Card/card1/c1.png", "o-asset/Card/card1/c2.jpg", "o-asset/Card/card1/c3.png", "o-asset/Card/card1/c4.png", "o-asset/Card/card1/c5.png", "o-asset/Card/card1/c6.png", "o-asset/Card/card1/c7.png", "o-asset/Card/card1/c8.png", "o-asset/Card/card1/c9.png", "o-asset/Card/card1/c10.png", "o-asset/Card/card1/c11.png", "o-asset/Card/card1/c12.png", "o-asset/Card/card1/c13.png", "o-asset/Card/card1/c14.png", "o-asset/Card/card1/c15.png", "o-asset/Card/card1/c16.png", "o-asset/Card/card1/c17.png", "o-asset/Card/card1/c18.png", "o-asset/Card/card1/c19.png", "o-asset/Card/card1/c20.png", "o-asset/Card/card1/c21.png", "o-asset/Card/card1/c22.png", "o-asset/Card/card1/c23.png"] },
        { title: `娃三岁1`, desc: `<p>该卡牌的部分卡面展示<br>一套卡牌为24-26个卡位,1卡位为1系列,分别有9-12张卡牌<br>娃三岁第一系列的卡牌设计，对卡面、卡背进行完善设计；把握整套系列的画面并对画面进行丰富处理；同时也进行文字的设计和排版。</p>`, mediaList: ["o-asset/Card/card2/c1.png", "o-asset/Card/card2/c2.png", "o-asset/Card/card2/c3.png", "o-asset/Card/card2/c4.png", "o-asset/Card/card2/c5.png", "o-asset/Card/card2/c6.png", "o-asset/Card/card2/c7.png", "o-asset/Card/card2/c8.png", "o-asset/Card/card2/c9.png", "o-asset/Card/card2/c10.png", "o-asset/Card/card2/c11.png", "o-asset/Card/card2/c12.png", "o-asset/Card/card2/c13.png", "o-asset/Card/card2/c14.png", "o-asset/Card/card2/c15.png", "o-asset/Card/card2/c16.png", "o-asset/Card/card2/c17.png", "o-asset/Card/card2/c18.png", "o-asset/Card/card2/c19.png"] },
        { title: `娃三岁2`, desc: `<p>该卡牌的部分卡面展示<br>一套卡牌为24-26个卡位,1卡位为1系列,分别有9-12张卡牌<br>娃三岁第二系列的卡牌设计，对卡面、卡背进行完善设计；把握整套系列的画面并对画面进行丰富处理；同时也进行文字的设计和排版。</p>`, mediaList: ["o-asset/Card/card3/c1.jpg", "o-asset/Card/card3/c2.jpg", "o-asset/Card/card3/c3.jpg", "o-asset/Card/card3/c4.jpg", "o-asset/Card/card3/c5.jpg", "o-asset/Card/card3/c6.jpg", "o-asset/Card/card3/c7.jpg", "o-asset/Card/card3/c8.jpg", "o-asset/Card/card3/c9.jpg", "o-asset/Card/card3/c10.jpg", "o-asset/Card/card3/c11.jpg", "o-asset/Card/card3/c12.jpg", "o-asset/Card/card3/c14.jpg", "o-asset/Card/card3/c15.jpg", "o-asset/Card/card3/c16.jpg", "o-asset/Card/card3/c17.jpg", "o-asset/Card/card3/c18.jpg", "o-asset/Card/card3/c19.jpg", "o-asset/Card/card3/c20.jpg", "o-asset/Card/card3/c21.jpg", "o-asset/Card/card3/c22.jpg", "o-asset/Card/card3/c23.jpg", "o-asset/Card/card3/c24.jpg", "o-asset/Card/card3/c25.jpg", "o-asset/Card/card3/c26.jpg"] },
        { title: `娃三岁3`, desc: `<p>该卡牌的部分卡面展示<br>一套卡牌为24-26个卡位,1卡位为1系列,分别有9-12张卡牌<br>娃三岁第三系列的卡牌设计，对卡面、卡背进行完善设计；把握整套系列的画面并对画面进行丰富处理；同时也进行文字的设计和排版。</p>`, mediaList: ["o-asset/Card/card4/c1.jpg", "o-asset/Card/card4/c2.jpg", "o-asset/Card/card4/c3.jpg", "o-asset/Card/card4/c4.jpg", "o-asset/Card/card4/c5.jpg", "o-asset/Card/card4/c6.jpg", "o-asset/Card/card4/c7.jpg", "o-asset/Card/card4/c8.jpg", "o-asset/Card/card4/c9.jpg", "o-asset/Card/card4/c10.jpg", "o-asset/Card/card4/c11.jpg", "o-asset/Card/card4/c12.jpg", "o-asset/Card/card4/c13.jpg", "o-asset/Card/card4/c14.jpg", "o-asset/Card/card4/c15.jpg", "o-asset/Card/card4/c16.jpg", "o-asset/Card/card4/c17.jpg", "o-asset/Card/card4/c18.jpg", "o-asset/Card/card4/c19.jpg", "o-asset/Card/card4/c20.jpg", "o-asset/Card/card4/c21.jpg", "o-asset/Card/card4/c22.jpg"] }
    ],
    motion: [
        { title: `生长`, desc: `<p>这部分的动态海报主要结合了AI和剪映,将主题绘制内容绘制出来并进行排版设计；<br>进行首尾帧的细节修改,并利用AI制作出想要的效果;同时再到剪映中剪辑出自己想要的效果。</p>`, mediaList: ["o-asset/dynamic/tree.mp4", "o-asset/dynamic/coffee.mp4", "o-asset/dynamic/follow.mp4", "o-asset/dynamic/glow.mp4", "o-asset/dynamic/woman.mp4", "o-asset/dynamic/cup.mp4", "o-asset/dynamic/sunshine.mp4"] },
        { title: `咖啡`, desc: `<p>这部分的动态海报主要结合了AI和剪映,将主题绘制内容绘制出来并进行排版设计；<br>进行首尾帧的细节修改,并利用AI制作出想要的效果;同时再到剪映中剪辑出自己想要的效果。</p>`, mediaList: ["o-asset/dynamic/coffee.mp4", "o-asset/dynamic/tree.mp4", "o-asset/dynamic/follow.mp4", "o-asset/dynamic/glow.mp4", "o-asset/dynamic/woman.mp4", "o-asset/dynamic/cup.mp4", "o-asset/dynamic/sunshine.mp4"] },
        { title: `语言暴力`, desc: `这部分的动态海报主要结合了p5js和剪映,将主题绘制内容绘制出来并进行排版设计；<br>进行首尾帧的细节修改,并利用代码制作出想要的效果;同时再到剪映中剪辑出自己想要的效果。</p>`, mediaList: ["o-asset/dynamic/follow.mp4", "o-asset/dynamic/tree.mp4", "o-asset/dynamic/coffee.mp4", "o-asset/dynamic/glow.mp4", "o-asset/dynamic/woman.mp4", "o-asset/dynamic/cup.mp4", "o-asset/dynamic/sunshine.mp4"] },
        { title: `春天`, desc: `<p>这部分的动态海报完全采用p5js代码设计而出,后进行排版设计；<br>利用代码制作出想要的效果后到剪映中剪辑出自己想要的效果。</p>`, mediaList: ["o-asset/dynamic/glow.mp4", "o-asset/dynamic/tree.mp4", "o-asset/dynamic/coffee.mp4", "o-asset/dynamic/follow.mp4", "o-asset/dynamic/woman.mp4", "o-asset/dynamic/cup.mp4", "o-asset/dynamic/sunshine.mp4"] },
        { title: `力量`, desc: `<p>这部分的动态海报主要运用了插画和剪映,将主题绘制内容绘制出来并进行排版设计；<br>排版完成再到剪映中剪辑出自己想要的效果。</p>`, mediaList: ["o-asset/dynamic/woman.mp4", "o-asset/dynamic/tree.mp4", "o-asset/dynamic/coffee.mp4", "o-asset/dynamic/follow.mp4", "o-asset/dynamic/glow.mp4", "o-asset/dynamic/cup.mp4", "o-asset/dynamic/sunshine.mp4"] },
        { title: `城市角落`, desc: `<p>这部分的动态海报主要结合了AI和剪映,将主题绘制内容绘制出来并进行排版设计；<br>进行首尾帧的细节修改,并利用AI制作出想要的效果;同时再到剪映中剪辑出自己想要的效果。</p>`, mediaList: ["o-asset/dynamic/cup.mp4", "o-asset/dynamic/tree.mp4", "o-asset/dynamic/coffee.mp4", "o-asset/dynamic/follow.mp4", "o-asset/dynamic/glow.mp4", "o-asset/dynamic/woman.mp4", "o-asset/dynamic/sunshine.mp4"] },
        { title: `晾晒`, desc: `<p>这部分的动态海报主要结合了p5js和剪映,将主题绘制内容绘制出来并进行排版设计；<br>进行首尾帧的细节修改,并利用代码制作出想要的效果;同时再到剪映中剪辑出自己想要的效果。</p>`, mediaList: ["o-asset/dynamic/sunshine.mp4", "o-asset/dynamic/tree.mp4", "o-asset/dynamic/coffee.mp4", "o-asset/dynamic/follow.mp4", "o-asset/dynamic/glow.mp4", "o-asset/dynamic/woman.mp4", "o-asset/dynamic/cup.mp4"] }
    ]
};

// =========================================================================
// 🚀 全局生命周期与事件绑定引擎 
// =========================================================================
let brandHasPlayed = false; 
let brandAnimFinished = false; 
let p5Instance = null; 
let homeP5Instance = null; 

function initializeAllSystems() {
    initKvStack();
    setTimeout(() => { updatePocketView('ip', false); }, 500);

    const brandDetail = document.getElementById('brand-detail-page');
    if (brandDetail) {
        brandDetail.addEventListener('wheel', (e) => {
            if (brandDetail.classList.contains('open') && document.getElementById('global-lightbox').style.display !== 'flex') {
                if (e.target.closest('.split-left')) {
                    e.preventDefault();
                    if (e.deltaY > 0) changeDetailImg(1);
                    else changeDetailImg(-1);
                }
            }
        }, { passive: false });
    }

    const otherModal = document.getElementById('other-custom-modal');
    if (otherModal) {
        otherModal.addEventListener('wheel', (e) => {
            if (otherModal.classList.contains('open') && document.getElementById('global-lightbox').style.display !== 'flex') {
                if (e.target.closest('.left-panel') && !e.target.closest('.desc')) {
                    e.preventDefault();
                    if (e.deltaY > 0) slideOtherMedia(1);
                    else slideOtherMedia(-1);
                }
            }
        }, { passive: false });
    }

    switchPage('page-home'); 
    const scrollArea = document.getElementById('graphic-scroll-area');
    if(scrollArea) scrollArea.addEventListener('scroll', handleGraphicScroll);
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initializeAllSystems);
} else {
    initializeAllSystems();
}


// =========================================================================
// 🚀 核心导航路由控制器
// =========================================================================
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const nav = document.getElementById('global-nav');
    
    if(pageId === 'page-graphic') {
        nav.style.display = 'none'; 
    } else {
        nav.style.display = 'flex';
    }

    if(pageId === 'page-home') {
        nav.style.background = '#e1e1e1';
        nav.style.backdropFilter = 'none';
        nav.style.boxShadow = 'none';
    } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.boxShadow = 'none';
    }

    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('#global-nav .nav-item').forEach(item => item.classList.remove('active'));
    const targetNavClass = '.nav-' + pageId.replace('page-', '');
    const activeNav = document.querySelector(targetNavClass);
    if(activeNav) activeNav.classList.add('active');
    
    if(pageId === 'page-home') initHomeP5Canvas(); else destroyHomeP5Canvas(); 
    if(pageId === 'page-brand') playBrandSequence();
}

// =========================================================================
// 🎨 【首页 P5.JS 物理核心引擎】
// =========================================================================
function initHomeP5Canvas() { if (!homeP5Instance) { homeP5Instance = new p5(homeSketch, 'home-p5-container'); } }
function destroyHomeP5Canvas() { if (homeP5Instance) { homeP5Instance.remove(); homeP5Instance = null; } }
function openHomeIntroModal() { const modal = document.getElementById('home-intro-modal'); if (modal) modal.classList.add('open'); }
function closeHomeIntroModal() { const modal = document.getElementById('home-intro-modal'); if (modal) modal.classList.remove('open'); }

const homeSketch = (p) => {
    let imgBg, imgCenter, imgDizzy, imgBottomText, imgBulbOff, imgBulbOn;
    let sideIcons = [], brainImgs = [], flowerImgs = [], bottomStrobes = [], bottomExtras = [], dizzyElements = [];
    
    let topState = 0;           
    let topTimer = 0;         
    let brainColorIndex = 0;    
    let orbitAngle = 0;         
    let iconFlashIndex = -1;     

    let bottomTriggered = false; 
    let bottomState = 0;         
    let bottomTimer = 0;
    let bottomFlashIndex = -1;   

    let scaleRatio = 1;         
    let calculatedHeight = 0;   
    let cx = 0, cy = 0;         
    
    let bulbHitbox = {x:0, y:0, w:0, h:0}; 
    let iconHitboxes = []; 

    function safeLoad(path) {
        return p.loadImage(path, () => {}, () => console.warn(`警告: 图片未找到 ${path}`));
    }

    function drawProportional(img, x, y, targetWidth, fallbackText="图片丢失") {
        if (!img || img.width < 10) {
            p.push();
            p.translate(x, y); p.rectMode(p.CENTER);
            p.stroke(255, 50, 50); p.strokeWeight(2); p.fill(20, 20, 20, 180);
            p.rect(0, 0, targetWidth, targetWidth * 0.8, 8);
            p.noStroke(); p.fill(255); p.textSize(12); p.textAlign(p.CENTER, p.CENTER);
            p.text(fallbackText, 0, 0);
            p.pop();
            return;
        }
        let h = targetWidth * (img.height / img.width);
        p.image(img, x, y, targetWidth, h);
    }

    p.preload = () => {
        imgBg = safeLoad(HOME_BG_IMAGE_PATH);
        imgCenter = safeLoad(HOME_CENTER_MAIN_PATH);
        for (let path of SIDE_ICON_PATHS) sideIcons.push(safeLoad(path));
        for (let path of FLOWER_PATHS) flowerImgs.push(safeLoad(path));
        for (let path of BRAIN_IMAGE_PATHS) brainImgs.push(safeLoad(path));
        imgDizzy = safeLoad(DIZZY_LINE_IMAGE_PATH);
        for (let path of DIZZY_ELEMENT_PATHS) dizzyElements.push(safeLoad(path));
        imgBottomText = safeLoad(BOTTOM_TEXT_IMAGE_PATH);
        for (let path of BOTTOM_STROBE_PATHS) bottomStrobes.push(safeLoad(path));
        for (let path of BOTTOM_EXTRA_PATHS) bottomExtras.push(safeLoad(path));
        imgBulbOff = safeLoad(BULB_OFF_PATH);
        imgBulbOn = safeLoad(BULB_ON_PATH);
    };

    p.setup = () => {
        let container = document.getElementById('page-home');
        let cWidth = container.clientWidth || p.windowWidth;
        let baseBgWidth = imgBg && imgBg.width > 10 ? imgBg.width : 1920;
        let baseBgHeight = imgBg && imgBg.height > 10 ? imgBg.height : 3000;
        scaleRatio = cWidth / baseBgWidth;
        calculatedHeight = baseBgHeight * scaleRatio;
        
        p.createCanvas(cWidth, calculatedHeight);
        p.imageMode(p.CENTER);
        document.documentElement.style.setProperty('--home-bg-calculated-height', calculatedHeight + 'px');
        
        container.addEventListener('scroll', () => {
            if (container.scrollTop > 150 && !bottomTriggered) {
                bottomTriggered = true;
                bottomState = 1; 
            }
        });
    };

    p.draw = () => {
        p.clear();

        if (imgBg && imgBg.width > 10) { 
            p.image(imgBg, p.width / 2, calculatedHeight / 2, p.width, calculatedHeight); 
        } else {
            p.background(30); 
            p.fill(255, 100, 100); p.textSize(24); p.textAlign(p.CENTER, p.CENTER);
            p.text("⚠️ 找不到背景大图，请检查 HOME_BG_IMAGE_PATH 路径！", p.width/2, 120);
        }

        cx = p.width / 2;
        cy = calculatedHeight * 0.22; 

        if (topState === 0) {
            topTimer++;
            if (topTimer % 15 === 0) { 
                iconFlashIndex++;
                if (iconFlashIndex >= sideIcons.length) {
                    iconFlashIndex = -1;
                    topState = 1; 
                    topTimer = 0;
                    brainColorIndex = 0;
                }
            }
        } else if (topState === 1) {
            topTimer++;
            if (topTimer % 30 === 0) { 
                brainColorIndex++;
                if (brainColorIndex >= brainImgs.length) {
                    brainColorIndex = 0; 
                    topState = 2; 
                    topTimer = 0;
                }
            }
        } else if (topState === 2) {
            topTimer++;
            if (topTimer >= 180) { 
                topState = 0; 
                topTimer = 0;
                iconFlashIndex = 0;
            }
        }
        orbitAngle += 0.025; 

        if (bottomState === 1) {
            bottomTimer++;
            if (bottomTimer < 30) {
                bottomFlashIndex = 0; 
            } else if (bottomTimer < 60) {
                bottomFlashIndex = 1; 
            } else {
                bottomFlashIndex = -1; 
                bottomState = 2; 
                bottomTimer = 0;
            }
        }

        let cLayout = CENTER_IMG_LAYOUT;
        drawProportional(imgCenter, cx + (cLayout.dx * scaleRatio), cy + (cLayout.dy * scaleRatio), cLayout.w * scaleRatio * GLOBAL_SCALE, "人物底图");

        let mouseRot = p.map(p.mouseX, 0, p.width, -p.PI, p.PI); 
        for (let i = 0; i < FLOWER_LAYOUT.length; i++) {
            let layout = FLOWER_LAYOUT[i];
            let ix = cx + layout.dx * scaleRatio * GLOBAL_SCALE;
            let iy = cy + layout.dy * scaleRatio * GLOBAL_SCALE;
            p.push();
            p.translate(ix, iy); p.rotate(mouseRot + (i * 0.5)); 
            drawProportional(flowerImgs[i], 0, 0, layout.w * scaleRatio * GLOBAL_SCALE, "花");
            p.pop();
        }

        iconHitboxes = []; 
        for (let i = 0; i < Math.min(sideIcons.length, STROBE_LAYOUT.length); i++) {
            let layout = STROBE_LAYOUT[i];
            let ix = cx + layout.dx * scaleRatio * GLOBAL_SCALE;
            let iy = cy + layout.dy * scaleRatio * GLOBAL_SCALE;
            let w = layout.w * scaleRatio * GLOBAL_SCALE;
            
            iconHitboxes[i] = { x: ix, y: iy, w: w, h: w };

            p.push();
            p.blendMode(p.BLEND); p.tint(255, 255); 
            drawProportional(sideIcons[i], ix, iy, w, "闪图"+i); 
            
            if (iconFlashIndex === i && topState === 0) {
                p.blendMode(p.ADD); 
                drawProportional(sideIcons[i], ix, iy, w); 
                drawProportional(sideIcons[i], ix, iy, w); 
            }
            p.pop();
        }

        let bLayout = BRAIN_IMG_LAYOUT;
        let brainX = cx + (bLayout.dx * scaleRatio);
        let brainY = cy + (bLayout.dy * scaleRatio); 
        drawProportional(brainImgs[brainColorIndex], brainX, brainY, bLayout.w * scaleRatio * GLOBAL_SCALE, "脑子");

        p.push();
        let dzLayout = DIZZY_LINE_LAYOUT;
        p.translate(cx + (dzLayout.dx * scaleRatio), cy + (dzLayout.dy * scaleRatio)); 
        
        drawProportional(imgDizzy, 0, 0, dzLayout.w * scaleRatio * GLOBAL_SCALE, "眩晕圈");

        p.push(); 
        p.rotate(-0.15); 
        let rX = PLANET_LAYOUT.orbitRadius * 2.2 * scaleRatio * GLOBAL_SCALE; 
        let rY = PLANET_LAYOUT.orbitRadius * 0.6 * scaleRatio * GLOBAL_SCALE; 
        
        let planetCount = Math.max(1, dizzyElements.length); 
        let angleStep = p.TWO_PI / planetCount;              
        
        for(let i = 0; i < planetCount; i++) {
            let currentAngle = (orbitAngle * 1.5) + (i * angleStep); 
            let px = p.cos(currentAngle) * rX; 
            let py = p.sin(currentAngle) * rY; 
            
            p.push();
            p.translate(px, py);
            p.rotate(orbitAngle * 3); 
            let planetImg = dizzyElements[i] ? dizzyElements[i] : dizzyElements[0];
            drawProportional(planetImg, 0, 0, PLANET_LAYOUT.w * scaleRatio * GLOBAL_SCALE, "星星");
            p.pop();
        }
        p.pop(); 
        p.pop(); 

        let txtLayout = BOTTOM_TEXT_LAYOUT;
        let bottomX = cx + (txtLayout.dx * scaleRatio);
        let bottomY = cy + (txtLayout.dy * scaleRatio); 
        drawProportional(imgBottomText, bottomX, bottomY, txtLayout.w * scaleRatio * GLOBAL_SCALE, "下方文字");

        for (let i = 0; i < Math.min(bottomStrobes.length, BOTTOM_STROBE_LAYOUT.length); i++) {
            let layout = BOTTOM_STROBE_LAYOUT[i];
            let bx = cx + layout.dx * scaleRatio * GLOBAL_SCALE;
            let by = cy + layout.dy * scaleRatio * GLOBAL_SCALE;
            let w = layout.w * scaleRatio * GLOBAL_SCALE;

            p.push();
            p.blendMode(p.BLEND); p.tint(255, 255);
            drawProportional(bottomStrobes[i], bx, by, w, "闪星"); 
            if (bottomFlashIndex === i && bottomState === 1) {
                p.blendMode(p.ADD);
                drawProportional(bottomStrobes[i], bx, by, w); 
                drawProportional(bottomStrobes[i], bx, by, w); 
            }
            p.pop();
        }

        for (let i = 0; i < Math.min(bottomExtras.length, BOTTOM_EXTRA_LAYOUT.length); i++) {
            let layout = BOTTOM_EXTRA_LAYOUT[i];
            let ex = cx + layout.dx * scaleRatio * GLOBAL_SCALE;
            let ey = cy + layout.dy * scaleRatio * GLOBAL_SCALE;
            p.push();
            p.blendMode(p.BLEND); p.tint(255, 255);
            drawProportional(bottomExtras[i], ex, ey, layout.w * scaleRatio * GLOBAL_SCALE, "底部图"); 
            p.pop();
        }

        p.push();
        let bulbCfg = BULB_LAYOUT;
        let bulbW = bulbCfg.w * scaleRatio * GLOBAL_SCALE;
        bulbHitbox.x = cx + (bulbCfg.dx * scaleRatio * GLOBAL_SCALE); 
        bulbHitbox.y = cy + (bulbCfg.dy * scaleRatio * GLOBAL_SCALE);
        bulbHitbox.w = bulbW; 
        bulbHitbox.h = bulbW * 1.5; 

        let currentBulb = imgBulbOff; 
        if (bottomState === 2) {
            let isLightOn = (p.frameCount % 60) > 30;
            currentBulb = isLightOn ? imgBulbOn : imgBulbOff;
        } else if (bottomState === 3) {
            currentBulb = imgBulbOn;
        }

        p.blendMode(p.BLEND); p.tint(255, 255);
        drawProportional(currentBulb, bulbHitbox.x, bulbHitbox.y, bulbW, "灯");

        let hoveringBulb = (bottomState >= 2 && 
            p.mouseX > bulbHitbox.x - bulbHitbox.w/2 && p.mouseX < bulbHitbox.x + bulbHitbox.w/2 &&
            p.mouseY > bulbHitbox.y - bulbHitbox.h/2 && p.mouseY < bulbHitbox.y + bulbHitbox.h/2);
            
        let hoveringAnyIcon = false;
        for (let i of [2, 4, 7, 9]) {
            if (iconHitboxes[i] && 
                p.mouseX > iconHitboxes[i].x - iconHitboxes[i].w/2 && p.mouseX < iconHitboxes[i].x + iconHitboxes[i].w/2 &&
                p.mouseY > iconHitboxes[i].y - iconHitboxes[i].h/2 && p.mouseY < iconHitboxes[i].y + iconHitboxes[i].h/2) {
                hoveringAnyIcon = true;
                break;
            }
        }

        if (hoveringBulb) {
            showTooltip("点击查看"); p.cursor(p.HAND);
        } else if (hoveringAnyIcon) {
            hideTooltip(); p.cursor(p.HAND);
        } else {
            hideTooltip(); p.cursor(p.ARROW);
        }
        p.pop();
    };

    p.mousePressed = () => {
        if (bottomState >= 2) { 
            if (p.mouseX > bulbHitbox.x - bulbHitbox.w/2 && p.mouseX < bulbHitbox.x + bulbHitbox.w/2 &&
                p.mouseY > bulbHitbox.y - bulbHitbox.h/2 && p.mouseY < bulbHitbox.y + bulbHitbox.h/2) {
                bottomState = 3; 
                openHomeIntroModal();
                return; 
            }
        }
        let clickedIcon = -1;
        for (let i of [2, 4, 7, 9]) {
            if (iconHitboxes[i] && 
                p.mouseX > iconHitboxes[i].x - iconHitboxes[i].w/2 && p.mouseX < iconHitboxes[i].x + iconHitboxes[i].w/2 &&
                p.mouseY > iconHitboxes[i].y - iconHitboxes[i].h/2 && p.mouseY < iconHitboxes[i].y + iconHitboxes[i].h/2) {
                clickedIcon = i;
                break;
            }
        }
        if (clickedIcon === 2) { switchPage('page-brand'); } 
        else if (clickedIcon === 4) { switchPage('page-other'); setTimeout(() => { if (typeof clickPocket === 'function') clickPocket('motion'); }, 300); } 
        else if (clickedIcon === 7) { switchPage('page-graphic'); } 
        else if (clickedIcon === 9) { switchPage('page-other'); }
    };

    p.windowResized = () => {
        let container = document.getElementById('page-home');
        let cWidth = container.clientWidth || p.windowWidth;
        let baseBgWidth = imgBg && imgBg.width > 10 ? imgBg.width : 1920;
        let baseBgHeight = imgBg && imgBg.height > 10 ? imgBg.height : 3000;
        scaleRatio = cWidth / baseBgWidth;
        calculatedHeight = baseBgHeight * scaleRatio;
        p.resizeCanvas(cWidth, calculatedHeight);
        document.documentElement.style.setProperty('--home-bg-calculated-height', calculatedHeight + 'px');
    };
};

// ==========================================
// 交互与画廊组件
// ==========================================
const tooltip = document.getElementById('custom-tooltip');
document.addEventListener('mousemove', (e) => { if (tooltip && tooltip.style.opacity === '1') { tooltip.style.left = (e.clientX + 15) + 'px'; tooltip.style.top = (e.clientY + 15) + 'px'; } });
function showTooltip(text) { if (!tooltip) return; tooltip.innerHTML = text; tooltip.style.opacity = '1'; }
function hideTooltip() { if (!tooltip) return; tooltip.style.opacity = '0'; }

function scrollSeries(event, btn, direction) { event.stopPropagation(); const scrollArea = btn.parentElement.querySelector('.series-h-scroll'); if (scrollArea) scrollArea.scrollBy({ left: direction * scrollArea.clientWidth, behavior: 'smooth' }); }
function handleGraphicScroll() {
    const sections = ['section-poster', 'section-kv', 'section-long']; let currentId = sections[0]; let currentIndex = 0;
    sections.forEach((id, index) => { const sec = document.getElementById(id); if(sec) { const rect = sec.getBoundingClientRect(); if(rect.top < window.innerHeight / 2) { currentId = id; currentIndex = index; } } });
    document.querySelectorAll('.sidebar-dots .dot').forEach(dot => { dot.classList.remove('active'); if(dot.getAttribute('data-target') === currentId) dot.classList.add('active'); });
    const sidebarTrack = document.getElementById('sidebar-track'); const singleSlide = document.querySelector('.sidebar-slide'); if (sidebarTrack && singleSlide) sidebarTrack.style.transform = `translateY(-${currentIndex * singleSlide.offsetHeight}px)`;
}
function scrollToGraphicSection(sectionId) { const targetSection = document.getElementById(sectionId); if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

// 🌟 修复项 2：主视觉卡顿彻底优化
let kvCards = []; let isKvAnimating = false; let kvAutoPlayTimer = null; let isKvGridMode = false;
function initKvStack() {
    kvCards = Array.from(document.querySelectorAll('#kv-coverflow .cf-item')); if (kvCards.length === 0) return;
    updateKvStackClasses(); startKvAutoPlay();      
    const track = document.getElementById('kv-coverflow'); 
    if (track) { 
        track.addEventListener('mousemove', handleKvTilt); 
        track.addEventListener('mouseleave', resetKvTilt); 
        track.addEventListener('mouseenter', stopKvAutoPlay); 
        track.addEventListener('mouseleave', () => { if (!isKvGridMode) startKvAutoPlay(); }); 
    }
}
function updateKvStackClasses() { if (isKvGridMode) return; kvCards.forEach((card, index) => { card.classList.remove('cf-front', 'cf-s1', 'cf-s2', 'cf-s3', 'cf-s4', 'cf-s5', 'cf-s6', 'cf-out-right', 'cf-in-left'); if (index === 0) card.classList.add('cf-front'); else if (index === 1) card.classList.add('cf-s1'); else if (index === 2) card.classList.add('cf-s2'); else if (index === 3) card.classList.add('cf-s3'); else if (index === 4) card.classList.add('cf-s4'); else if (index === 5) card.classList.add('cf-s5'); else if (index === 6) card.classList.add('cf-s6'); }); }
function drawNextKvCard(e) { if(e) e.stopPropagation(); if (isKvGridMode || isKvAnimating || kvCards.length <= 1) return; isKvAnimating = true; const topCard = kvCards.shift(); topCard.classList.remove('cf-front'); topCard.classList.add('cf-out-right'); updateKvStackClasses(); setTimeout(() => { topCard.classList.remove('cf-out-right'); kvCards.push(topCard); topCard.classList.add('cf-s6'); isKvAnimating = false; }, 600); }
function drawPrevKvCard(e) { if(e) e.stopPropagation(); if (isKvGridMode || isKvAnimating || kvCards.length <= 1) return; isKvAnimating = true; const bottomCard = kvCards.pop(); bottomCard.classList.remove('cf-s6'); bottomCard.classList.add('cf-in-left'); kvCards.unshift(bottomCard); updateKvStackClasses(); setTimeout(() => { bottomCard.classList.remove('cf-in-left'); bottomCard.classList.add('cf-front'); isKvAnimating = false; }, 600); }
function handleKvClick(e, element) { 
    e.stopPropagation(); 
    if (isKvGridMode) openGallery(element); 
    else { 
        isKvGridMode = true; 
        stopKvAutoPlay(); 
        document.getElementById('kv-coverflow').classList.add('kv-grid-mode'); 
        document.querySelectorAll('.cf-arrow').forEach(el => el.style.display = 'none'); 
        document.getElementById('kv-wrapper').style.height = 'auto'; 
        document.getElementById('kv-wrapper').style.minHeight = 'auto'; 
        // 彻底移除 inline styles 让 CSS Grid 顺利接管
        document.querySelectorAll('#kv-coverflow .cf-item').forEach(item => { item.style.transform = ''; item.style.transition = ''; }); 
    } 
}
function revertKvMode(e) { 
    if (e.target.id === 'kv-wrapper' || e.target.id === 'kv-coverflow') { 
        if (isKvGridMode) { 
            isKvGridMode = false; 
            document.getElementById('kv-coverflow').classList.remove('kv-grid-mode'); 
            document.querySelectorAll('.cf-arrow').forEach(el => el.style.display = 'flex'); 
            document.getElementById('kv-wrapper').style.height = '50vh'; 
            document.getElementById('kv-wrapper').style.minHeight = '400px'; 
            updateKvStackClasses(); 
            startKvAutoPlay(); 
        } 
    } 
}
function handleKvTilt(e) { 
    // 限制：在动画期间或网格模式时停止倾斜响应，防止卡顿！
    if (isKvGridMode || isKvAnimating) return; 
    const frontCard = document.querySelector('.cf-front'); 
    if (!frontCard) return; 
    const rect = frontCard.getBoundingClientRect(); 
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) { 
        const x = (e.clientX - rect.left) / rect.width * 2 - 1; 
        const y = (e.clientY - rect.top) / rect.height * 2 - 1; 
        frontCard.style.transform = `translate3d(0, 0, 100px) rotateX(${y * -12}deg) rotateY(${x * 12}deg)`; 
    } else { 
        resetKvTilt(); 
    } 
}
function resetKvTilt() { 
    if (isKvGridMode) return; 
    const frontCard = document.querySelector('.cf-front'); 
    if (frontCard) { frontCard.style.transform = ''; } 
}
function startKvAutoPlay() { if(kvAutoPlayTimer) clearInterval(kvAutoPlayTimer); kvAutoPlayTimer = setInterval(() => { drawNextKvCard(); }, 3000); }
function stopKvAutoPlay() { if(kvAutoPlayTimer) clearInterval(kvAutoPlayTimer); }

let galleryDataArray = []; let currentGalleryIndex = 0; let currentZoom = 1; let isDragging = false; let startY = 0; let currentY = 0;            
function openGallery(clickedElement) {
    if (!clickedElement) return; 
    let scopeContainer = clickedElement.closest('.poster-series-wrapper') || clickedElement.closest('.poster-grid') || clickedElement.closest('#kv-coverflow') || clickedElement.closest('.long-format-grid') || document.body; 
    const allImgs = Array.from(scopeContainer.querySelectorAll('.gallery-img')); 
    if (allImgs.length === 0) return;
    
    galleryDataArray = allImgs.map(img => {
        let captionHtml = img.getAttribute('data-caption') || '';
        if (img.closest('.poster-series-wrapper')) { const col = img.closest('.series-col'); const colIndex = Array.from(scopeContainer.querySelectorAll('.series-col')).indexOf(col); if (colIndex !== -1 && graphicProjectsData.series[colIndex]) { const project = graphicProjectsData.series[colIndex]; captionHtml = `<h2 style="color:#fff; font-size:18px; margin-bottom:10px; font-weight:bold; letter-spacing:1px;">${project.title}</h2><p style="color:#ccc; font-size:14px; line-height:1.7;">${project.desc}</p>`; } } 
        else if (img.closest('#kv-coverflow')) { const kvIndex = Array.from(scopeContainer.querySelectorAll('#kv-coverflow .cf-item')).indexOf(img); if (kvIndex !== -1 && graphicProjectsData.kv[kvIndex]) { const project = graphicProjectsData.kv[kvIndex]; captionHtml = `<h2 style="color:#fff; font-size:18px; margin-bottom:10px; font-weight:bold; letter-spacing:1px;">${project.title}</h2><p style="color:#ccc; font-size:14px; line-height:1.7;">${project.desc}</p>`; } } 
        else if (img.closest('.long-format-grid')) { const longIndex = Array.from(scopeContainer.querySelectorAll('.long-format-grid .gallery-img')).indexOf(img); if (longIndex !== -1 && graphicProjectsData.long[longIndex]) { const project = graphicProjectsData.long[longIndex]; captionHtml = `<h2 style="color:#fff; font-size:18px; margin-bottom:10px; font-weight:bold; letter-spacing:1px;">${project.title}</h2><p style="color:#ccc; font-size:14px; line-height:1.7;">${project.desc}</p>`; } }
        return { src: img.src, caption: captionHtml };
    });
    currentGalleryIndex = allImgs.indexOf(clickedElement); if (currentGalleryIndex === -1) currentGalleryIndex = 0; resetZoomInternalState(); updateLightboxImage();
    const lightbox = document.getElementById('global-lightbox'); 
    
    if(lightbox) { 
        lightbox.classList.remove('graphic-split-mode', 'mode-poster', 'mode-kv', 'mode-long', 'hide-caption');
        
        if (clickedElement.closest('.poster-grid')) {
            lightbox.classList.add('hide-caption'); 
        } else if (clickedElement.closest('.poster-series-wrapper')) { 
            lightbox.classList.add('graphic-split-mode', 'mode-poster'); 
        } else if (clickedElement.closest('.long-format-grid')) { 
            lightbox.classList.add('graphic-split-mode', 'mode-long'); 
        } else if (clickedElement.closest('#kv-coverflow')) { 
            lightbox.classList.add('graphic-split-mode', 'mode-kv'); 
        } 
        
        const targetImgEl = document.getElementById('lightbox-img'); 
        if (clickedElement.closest('.long-format-grid') && targetImgEl) { targetImgEl.style.borderRadius = "0px"; } else if (targetImgEl) { targetImgEl.style.borderRadius = "12px"; } 
        lightbox.style.display = 'flex'; 
    }
    initDragEvents(); 
}

function updateLightboxImage() { const lbImg = document.getElementById('lightbox-img'); const lbCaption = document.getElementById('lightbox-caption'); if (lbImg && galleryDataArray.length > 0) { lbImg.src = galleryDataArray[currentGalleryIndex].src; if(lbCaption) lbCaption.innerHTML = galleryDataArray[currentGalleryIndex].caption; resetZoomInternalState(); const counterEl = document.getElementById('lb-page-counter'); if (counterEl) { counterEl.innerText = `${currentGalleryIndex + 1} / ${galleryDataArray.length}`; } } }
function zoomGallery(delta) { currentZoom *= delta; if (currentZoom < 0.1) currentZoom = 0.1; if (currentZoom > 20) currentZoom = 20; applyImageTransform(); }
function manualZoom(val) { let parsed = parseFloat(val); if (isNaN(parsed)) return; currentZoom = parsed / 100; if (currentZoom < 0.1) currentZoom = 0.1; if (currentZoom > 20) currentZoom = 20; applyImageTransform(); }
function applyImageTransform() { const lbImg = document.getElementById('lightbox-img'); const container = document.getElementById('lb-drag-container'); const zoomInput = document.getElementById('zoom-input'); if (lbImg && container) { const baseH = lbImg.clientHeight; const scaledH = baseH * currentZoom; const containerH = container.clientHeight; const minY = Math.min(0, containerH - scaledH); const maxY = 0; currentY = Math.max(minY, Math.min(maxY, currentY)); lbImg.style.transform = `translate3d(0, ${currentY}px, 0) scale(${currentZoom})`; } if (zoomInput) zoomInput.value = Math.round(currentZoom * 100); }
function initDragEvents() { const container = document.getElementById('lb-drag-container'); if (!container) return; const newContainer = container.cloneNode(true); container.parentNode.replaceChild(newContainer, container); newContainer.onmousedown = (e) => { isDragging = true; startY = e.clientY - currentY; newContainer.style.cursor = 'grabbing'; }; window.onmousemove = (e) => { if (!isDragging) return; currentY = e.clientY - startY; applyImageTransform(); }; window.onmouseup = () => { isDragging = false; newContainer.style.cursor = 'grab'; }; newContainer.addEventListener('wheel', (e) => { e.preventDefault(); if (e.deltaY > 0) nextGallery(); else prevGallery(); }, { passive: false }); }
function resetZoomInternalState() { currentZoom = 1; currentY = 0; applyImageTransform(); }
function handleLightboxClick(e) { const lightbox = document.getElementById('global-lightbox'); if (!lightbox) return; const isSplitMode = lightbox.classList.contains('graphic-split-mode'); if (isSplitMode) { if (e.target.id === 'global-lightbox' || e.target.classList.contains('lb-close')) { lightbox.style.display = 'none'; return; } const imgEl = document.getElementById('lightbox-img'); if (imgEl && (e.target.id === 'lb-drag-container' || e.target.id === 'lb-wrapper')) { const rect = imgEl.getBoundingClientRect(); const paddingZone = 20; const clickX = e.clientX; const clickY = e.clientY; if (clickX < rect.left - paddingZone || clickX > rect.right + paddingZone || clickY < rect.top - paddingZone || clickY > rect.bottom + paddingZone) { lightbox.style.display = 'none'; } } } else { if (e.target.id === 'global-lightbox' || e.target.id === 'lb-wrapper' || e.target.id === 'lb-drag-container' || e.target.classList.contains('lb-close')) { lightbox.style.display = 'none'; } } }
function closeGallery() { const lightbox = document.getElementById('global-lightbox'); if(lightbox) lightbox.style.display = 'none'; }
function prevGallery(event) { if(event) event.stopPropagation(); if (currentGalleryIndex > 0) { currentGalleryIndex--; updateLightboxImage(); } }
function nextGallery(event) { if(event) event.stopPropagation(); if (currentGalleryIndex < galleryDataArray.length - 1) { currentGalleryIndex++; updateLightboxImage(); } }

function scrollBrandCards(direction) { const track = document.getElementById('b-cards'); const firstCard = track.querySelector('.b-card'); if(track && firstCard) { const scrollAmount = firstCard.offsetWidth + window.innerWidth * 0.02; track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' }); } }
function playBrandSequence() { if (brandHasPlayed) { showBrandFinalState(); return; } if (!p5Instance) p5Instance = new p5(sketch, 'p5-container'); }
function finishP5Animation() { brandHasPlayed = true; brandAnimFinished = true; document.getElementById('p5-container').classList.add('fade-out'); document.getElementById('b-content-layer').classList.add('show'); }
function showBrandFinalState() { brandAnimFinished = true; const canvasContainer = document.getElementById('p5-container'); if(canvasContainer) canvasContainer.style.display = 'none'; document.getElementById('b-content-layer').classList.add('show'); }

const sketch = (p) => {
    let state = 0; let fullText = "Brand Design"; let typeIndex = 0; let animT = 0; let fragT = 0; let mainDotRadius = 6.5; let splitDotRadius = 4.5; let dot1 = { y: -80, vy: 0 }; let dot2 = { y: 80, vy: 0 }; let gravity = 0.25; let bounceCount = 0; let colorBrand, colorDesign;
    p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight); p.textAlign(p.CENTER, p.CENTER); p.textFont('"Helvetica Neue", Helvetica, Arial, sans-serif'); p.noStroke(); colorBrand = p.color('#fee30b'); colorDesign = p.color('#f45935'); };
    p.draw = () => { p.clear(); p.translate(p.width / 2, p.height / 2); p.textSize(p.width * 0.02); if (state === 0) { p.fill(17); p.text(fullText.substring(0, p.floor(typeIndex)), 0, 0); typeIndex += 0.22; if (typeIndex > fullText.length + 3) state = 1; } else if (state === 1) { animT += 0.012; if (animT >= 1) { animT = 1; state = 2; dot1.y = -80; dot1.vy = 2; dot2.y = 80; dot2.vy = -2; } let easeT = animT < 0.5 ? 4 * animT * animT * animT : 1 - p.pow(-2 * animT + 2, 3) / 2; p.push(); p.rotate(easeT * p.HALF_PI); let twAll = p.textWidth("Brand Design"); let twB = p.textWidth("Brand"); let twD = p.textWidth("Design"); let startX_B = -(twAll / 2) + (twB / 2); let startX_D = (twAll / 2) - (twD / 2); let currentGap_B = p.lerp(startX_B, -80, easeT); let currentGap_D = p.lerp(startX_D, 80, easeT); p.push(); p.translate(currentGap_B, 0); p.scale(1 - easeT, 1); let colB = p.lerpColor(p.color(17), colorBrand, easeT); colB.setAlpha(255 * (1 - easeT)); p.fill(colB); p.text("Brand", 0, 0); p.pop(); colorBrand.setAlpha(255 * easeT); p.fill(colorBrand); p.circle(currentGap_B, 0, mainDotRadius * 2 * easeT); p.push(); p.translate(currentGap_D, 0); p.scale(1 - easeT, 1); let colD = p.lerpColor(p.color(17), colorDesign, easeT); colD.setAlpha(255 * (1 - easeT)); p.fill(colD); p.text("Design", 0, 0); p.pop(); colorDesign.setAlpha(255 * easeT); p.fill(colorDesign); p.circle(currentGap_D, 0, mainDotRadius * 2 * easeT); p.pop(); } else if (state === 2) { dot1.vy += gravity; dot2.vy -= gravity; dot1.y += dot1.vy; dot2.y += dot2.vy; if (dot1.y >= 0 && dot2.y <= 0) { dot1.y = 0; dot2.y = 0; bounceCount++; if (bounceCount === 1) { dot1.vy = -8.5; dot2.vy = 8.5; } else if (bounceCount === 2) { state = 3; } } colorBrand.setAlpha(255); p.fill(colorBrand); p.circle(0, dot1.y, mainDotRadius * 2); colorDesign.setAlpha(255); p.fill(colorDesign); p.circle(0, dot2.y, mainDotRadius * 2); } else if (state === 3) { fragT += 0.03; let easeF = 1 - p.pow(1 - fragT, 3); let w = p.width; let targetX = [-w * 0.38, -w * 0.126, w * 0.126, w * 0.38]; let alpha = 255; if (fragT > 0.2) alpha = p.map(fragT, 0.2, 1, 255, 0); p.fill(17, alpha); for (let i = 0; i < 4; i++) { let curX = p.lerp(0, targetX[i], easeF); p.circle(curX, 0, splitDotRadius * 2); } if (fragT >= 1) { state = 4; finishP5Animation(); p.noLoop(); } } }; p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); };
};

let currentDetailProjectId = 0; let currentDetailImgIndex = 0;  
function openBrandDetail(projectId) { const detailPage = document.getElementById('brand-detail-page'); const globalNav = document.getElementById('global-nav'); if(globalNav) globalNav.style.display = 'none'; loadProjectData(projectId); detailPage.classList.add('open'); }
function closeBrandDetail() { document.getElementById('brand-detail-page').classList.remove('open'); const globalNav = document.getElementById('global-nav'); if(globalNav) globalNav.style.display = 'flex'; }
function loadProjectData(projectId) { const data = brandProjectsData[projectId]; if(!data) return; currentDetailProjectId = projectId; currentDetailImgIndex = 0; document.getElementById('detail-title').innerHTML = data.title; document.getElementById('detail-desc').innerHTML = data.desc; const dotsContainer = document.getElementById('detail-dots'); dotsContainer.innerHTML = ''; data.images.forEach((_, index) => { const dot = document.createElement('div'); dot.className = index === 0 ? 'd-dot active' : 'd-dot'; dot.onclick = () => jumpToDetailImg(index); dotsContainer.appendChild(dot); }); renderDetailImg(); }
function renderDetailImg() { const data = brandProjectsData[currentDetailProjectId]; const imgEl = document.getElementById('detail-main-img'); const dots = document.querySelectorAll('#detail-dots .d-dot'); imgEl.src = data.images[currentDetailImgIndex]; dots.forEach((dot, idx) => { if(idx === currentDetailImgIndex) dot.classList.add('active'); else dot.classList.remove('active'); }); }
function changeDetailImg(direction) { const data = brandProjectsData[currentDetailProjectId]; const totalImgs = data.images.length; currentDetailImgIndex += direction; if(currentDetailImgIndex < 0) currentDetailImgIndex = totalImgs - 1; if(currentDetailImgIndex >= totalImgs) currentDetailImgIndex = 0; renderDetailImg(); }
function jumpToDetailImg(index) { currentDetailImgIndex = index; renderDetailImg(); }
function openBrandDetailGallery() { const data = brandProjectsData[currentDetailProjectId]; galleryDataArray = data.images.map((imgSrc, idx) => ({ src: imgSrc, caption: `${data.title} - 细节图 ${idx + 1}` })); currentGalleryIndex = currentDetailImgIndex; if(typeof resetZoomInternalState === 'function') resetZoomInternalState(); updateLightboxImage(); document.getElementById('global-lightbox').style.display = 'flex'; if(typeof initDragEvents === 'function') initDragEvents(); }

let currentPocketCategory = 'ip'; let isPocketOpen = false; 
function handleIconHover(category) { hoverPocket(category); if (isPocketOpen && currentPocketCategory === category) showTooltip('点击收起'); else showTooltip('点击展开'); }
function hoverPocket(category) { if (isPocketOpen || currentPocketCategory === category) return; currentPocketCategory = category; updatePocketView(category, false); }
function clickPocket(category) { if (isPocketOpen && currentPocketCategory === category) { isPocketOpen = false; updatePocketView(category, false); showTooltip('点击展开'); } else { currentPocketCategory = category; isPocketOpen = true; updatePocketView(category, true); showTooltip('点击收起'); } }

// 🌟 修复项 4：对接 CSS 变量，收起状态无缝衔接你的个性化调整
function updatePocketView(category, isOpen) { 
    document.querySelectorAll('.p-item').forEach(item => { 
        item.classList.remove('popped'); 
        item.style.opacity = '0'; 
        // 👇 现在直接读取你在 CSS 中填写的参数！
        item.style.transform = `translate(-50%, var(--init-y, 80px)) scale(var(--init-scale, 0.5))`; 
        item.style.pointerEvents = 'none'; 
        item.style.zIndex = '20'; 
    }); 
    const targetItems = document.querySelectorAll(`.p-item[data-category="${category}"]`); 
    const total = targetItems.length; 
    if (total === 0) return; 
    targetItems.forEach((item, index) => { 
        item.style.opacity = '1'; 
        const centerIdx = (total - 1) / 2; 
        const offset = index - centerIdx; 
        if (!isOpen) { 
            const rotIn = offset * 4 + (index % 2 === 0 ? -3 : 3); 
            const txIn = offset * 5; 
            const tyIn = -25 - Math.abs(offset) * 5; 
            item.style.transform = `translate(calc(-50% + ${txIn}px), ${tyIn}px) scale(1.15) rotate(${rotIn}deg)`; 
            item.style.zIndex = 25 - Math.abs(offset); 
        } else { 
            item.classList.add('popped'); 
            item.style.pointerEvents = 'auto'; 
            setTimeout(() => { 
                let spreadX = 140; let arcY = 15; let rotBase = 6; let baseUpY = -200; let scaleVal = 0.9; let myOffset = offset; let myZ = 50; 
                if (total > 4) { 
                    let row = index % 2; let itemsInRow = row === 0 ? Math.ceil(total/2) : Math.floor(total/2); let rowCenterIdx = (itemsInRow - 1) / 2; let idxInRow = Math.floor(index / 2); myOffset = idxInRow - rowCenterIdx; spreadX = 120; baseUpY = row === 0 ? -320 : -130; scaleVal = 0.7; rotBase = 4; myZ = row === 0 ? 40 : 50; 
                } 
                const tx = myOffset * spreadX; const ty = baseUpY + Math.abs(myOffset) * arcY; const rot = myOffset * rotBase; 
                item.style.zIndex = myZ - Math.abs(myOffset); 
                item.style.transform = `translate(calc(-50% + ${tx}px), ${ty}px) rotate(${rot}deg) scale(${scaleVal})`; 
            }, index * 40); 
        } 
    }); 
}

function openOtherDetail(category, index) { window.currentOtherCategory = category; window.currentOtherProjectIndex = index; window.currentOtherMediaIdx = 0; const globalNav = document.getElementById('global-nav'); if(globalNav) globalNav.style.display = 'none'; renderOtherModalContent(); document.getElementById('other-custom-modal').classList.add('open'); hideTooltip(); }

function renderOtherModalContent() { 
    const category = window.currentOtherCategory; 
    const index = window.currentOtherProjectIndex; 
    const data = otherProjectsData[category][index]; 
    if (!data) return; 
    
    const isVideo = category === 'motion'; 
    const mainMediaSrc = data.mediaList[window.currentOtherMediaIdx]; 
    
    let displayTitle = data.title;
    let displayDesc = data.desc;

    if (isVideo) {
        const matchedProject = otherProjectsData.motion.find(p => p.mediaList[0] === mainMediaSrc);
        if (matchedProject) {
            displayTitle = matchedProject.title;
            displayDesc = matchedProject.desc;
        }
    }

    let thumbsHtml = ''; 
    data.mediaList.forEach((media, idx) => { 
        if (idx === window.currentOtherMediaIdx) return; 
        if (isVideo) { 
            thumbsHtml += `<div class="grid-thumb" onclick="clickOtherThumb(${idx})"><video src="${media}" preload="metadata"></video></div>`; 
        } else { 
            thumbsHtml += `<div class="grid-thumb" onclick="clickOtherThumb(${idx})"><img src="${media}"></div>`; 
        } 
    }); 
    
    let mainHtml = isVideo 
        ? `<video src="${mainMediaSrc}" autoplay muted loop playsinline style="max-width:100%; max-height:100%; width:auto; height:auto; object-fit:contain; border-radius:8px; box-shadow:none;"></video>` 
        : `<img src="${mainMediaSrc}" style="max-width:100%; max-height:100%; width:auto; height:auto; object-fit:contain; border-radius:8px; box-shadow:none;">`; 
    
    let htmlContent = ''; 
    if (category === 'ip') { 
        const currentCount = window.currentOtherMediaIdx + 1; const totalCount = data.mediaList.length; 
        htmlContent = `<div class="layout-grid other-${category}"><div class="left-panel" style="flex: 100%; display: flex; align-items: center; justify-content: center; padding: 40px 0; background:transparent;"><div class="left-content-bundle" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 800px; position: relative;"><div style="display: flex; align-items: center; justify-content: center; width: 100%; margin-bottom: 25px;"><div class="left-panel-arrow left" onclick="slideOtherMedia(-1)" style="position: static; transform: none; flex-shrink: 0; margin-right: 20px;">❮</div><div class="main-media-box" id="other-main-media" style="height: 52vh; aspect-ratio: 1 / 1.414; width: auto; flex-shrink: 0; margin: 0; padding: 0; background:transparent;">${mainHtml}</div><div class="left-panel-arrow right" onclick="slideOtherMedia(1)" style="position: static; transform: none; flex-shrink: 0; margin-left: 20px;">❯</div></div><div style="text-align: center; color: #888; font-size: 13px; margin-bottom: 10px; font-weight: bold; user-select: none;">- ${currentCount} / ${totalCount} -</div><h2 style="text-align: center; margin-bottom: 12px; font-size: 20px; color: #111;">${displayTitle}</h2><div class="desc" style="text-align: center; max-width: 800px; margin: 0 auto; line-height: 1.8; color: #666; font-size: 14px;">${displayDesc}</div></div></div></div>`; 
    } else { 
        htmlContent = `<div class="layout-grid other-${category}"><div class="left-panel" style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 0 30px; background:transparent;"><div class="left-content-bundle" style="display: flex; flex-direction: column; width: 100%; height: 100%; justify-content: center; position: relative;"><div style="display: flex; align-items: center; justify-content: center; width: 100%; flex: 1; min-height: 0; margin-bottom: 25px; margin-top: 45px;"><div class="left-panel-arrow left" onclick="slideOtherMedia(-1)" style="position: static; transform: none; flex-shrink: 0; margin-right: 20px;">❮</div><div class="main-media-box" id="other-main-media" style="flex: 1; height: 100%; display: flex; align-items: center; justify-content: center; min-height: 0; margin: 0; background:transparent;">${mainHtml}</div><div class="left-panel-arrow right" onclick="slideOtherMedia(1)" style="position: static; transform: none; flex-shrink: 0; margin-left: 20px;">❯</div></div><h2 style="padding: 0 45px 12px 45px; text-align: left; font-size: 20px; color: #111; flex-shrink: 0;">${displayTitle}</h2><div class="desc" style="padding: 0 45px 45px 45px; text-align: left; line-height: 1.8; color: #666; font-size: 14px; flex-shrink: 0;">${displayDesc}</div></div></div><div class="right-panel"><div class="grid-scroll-area">${thumbsHtml}</div></div></div>`; 
    } 
    document.getElementById('other-modal-content-wrapper').innerHTML = htmlContent; 
}

function slideOtherMedia(dir) { 
    const data = otherProjectsData[window.currentOtherCategory][window.currentOtherProjectIndex]; 
    if (!data) return; 
    const total = data.mediaList.length; 
    window.currentOtherMediaIdx = (window.currentOtherMediaIdx + dir + total) % total; 
    renderOtherModalContent(); 
}

function clickOtherThumb(idx) { 
    window.currentOtherMediaIdx = idx; 
    renderOtherModalContent(); 
}

function closeOtherDetail(event) { 
    if (event && event.target.id !== 'other-custom-modal' && !event.target.classList.contains('btn-modal-close-global')) { 
        return; 
    } 
    document.getElementById('other-custom-modal').classList.remove('open'); 
    const globalNav = document.getElementById('global-nav'); 
    if (globalNav) { globalNav.style.display = 'flex'; } 
    const wrapper = document.getElementById('other-modal-content-wrapper'); 
    if (wrapper) { wrapper.innerHTML = ''; } 
}