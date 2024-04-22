/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('our_all_webtoon');

db.createCollection('account');

use('our_all_webtoon');
db.getCollection('account').insertOne({
    provider: 'local',
    username: 'mozu123',
    nickname: 'mozu',
    profileImage: '',
    email: 'oozu1994@gmail.com',
    password: '1234',
    age: 30,
    gender: 'male',
    createdAt: new Date(),
    isEnabled: true,
});
// 카카오톡 로그인 회원
db.getCollection('account').insertOne({
    provider: 'kakao',
    providerId: '123456789',
    accessToken: 'kakaoAccessToken',
    refreshToken: 'kakaoRefreshToken',
    nickname: '카카오닉네임',
    profileImage: 'https://kakao.com/profile/123456789',
    createdAt: new Date(),
});
/*
db.createCollection("account_log", {
  timeseries: {
    timeField: "createdAt",
    granularity: "day",
  },
});
db.getCollection("account_log").insertOne({
    account_id: ObjectId('id'),
    create_at: new Date(),
    ip:'127.0.0.1'
});
*/
use('our_all_webtoon');
db.createCollection('genre');
const genresNameList = [
    'romance',
    'fantasy',
    'different_world',
    'past_life',
    'drama',
    'action',
    'academy',
    'Reasoning',
    'period_biography',
    'documentary',
    'history',
    'middle_ages',
    'martial_arts',
    'thriller',
    'sports',
    'mukbang',
    'love_comedy',
    'gag',
    'daily',
    'music',
    'sf',
    'bl',
    'lily',
    'horror',
    'fear',
    'adult',
];
const genresList = [
    '로맨스',
    '판타지',
    '이세계',
    '전생',
    '드라마',
    '액션',
    '학원',
    '추리',
    '시대/전기',
    '다큐멘터리',
    '사극',
    '중세',
    '무협',
    '스릴러',
    '스포츠',
    '먹방',
    '러브코미디',
    '개그',
    '일상',
    '음악',
    'SF',
    'BL',
    '백합',
    '호러',
    '공포',
    '19',
].map((e) => ({
    name: e,
    created_at: new Date(),
}));
db.getCollection('genre').insertMany(genresList);

use('our_all_webtoon');
db.createCollection('webtoon');
db.getCollection('webtoon').insertOne({
    title: '아마추어 작가의 꿈',
    synopsis:
        '웹툰 제작에 대한 열정을 가진 아마추어 작가가 꿈을 향해 나아가는 이야기',
    author: ObjectId('6625df6ec32676e476f8133d'), // 회원 ID
    genre: [
        ObjectId('6625db7e6207966d2fb74271'), // 장르 컬렉션의 ID
    ],
    thumbnail: '/image/test.png',
    latestComments: [],
    createdAt: new Date(),
    upadtedAt: new Date(),
    serialScheduleAt: new Date(),
});

use('our_all_webtoon');
db.getCollection('episode').insertOne({
    webtoonId: ObjectId('6625dfb9d5cc032117692058'), // webtoons 컬렉션의 웹툰 ID
    chapter: 1,
    title: '첫 번째 에피소드',
    content: '웹툰 제작을 시작하는 주인공',
    subtitle: '웹툰 제작에 대한 열정을 가진 아마추어 작가의 이야기',
    images: ['/image/test.png', '/image/test.png'],
    latestComments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    publishAt: new Date(),
});

// rankings 컬렉션 생성
use('our_all_webtoon');
db.createCollection('ranking');
db.getCollection('ranking').insertOne({
    genre: '드라마',
    rankings: [
        { webtoonId: ObjectId('637f5935a63146f4c3b32879'), score: 4.5 },
        { webtoonId: ObjectId('637f5935a63146f4c3b32880'), score: 4.2 },
        { webtoonId: ObjectId('637f5935a63146f4c3b32881'), score: 4.0 },
    ],
    createdAt: new Date(),
});

// boards 컬렉션 생성
use('our_all_webtoon');
db.createCollection('board');
// 공지사항 게시글
db.getCollection('board').insertOne({
    type: 'notice',
    content: '웹툰 사이트 오픈 안내',
    author: ObjectId('6625df6ec32676e476f8133d'), // users 컬렉션의 일반 회원 ID
    latest_comments: [],
    createdAt: new Date(),
    isTop: true,
});

// 작가 피드 게시글
use('our_all_webtoon');
db.getCollection('feed').insertOne({
    content: '새로운 회차 업로드했습니다!',
    author: ObjectId('6625df6ec32676e476f8133d'), // users 컬렉션의 일반 회원 ID
    latestComments: [],
    createdAt: new Date(),
});

use('our_all_webtoon');
db.getCollection('feed_views').insertOne({
    feedId: ObjectId('6625dff0401dfe71ec1cb5f6'),
    userId: ObjectId('6625df6ec32676e476f8133d'),
    createAt: new Date(),
    isNew: true, // 첫 조회 여부 (true: 신규, false: 재시청)
});
use('our_all_webtoon');
db.getCollection('board_views').insertOne({
    boardId: ObjectId('6625dff0401dfe71ec1cb5f5'),
    userId: ObjectId('6625df6ec32676e476f8133d'),
    createAt: new Date(),
    isNew: true, // 첫 조회 여부 (true: 신규, false: 재시청)
});
use('our_all_webtoon');
db.getCollection('episode_views').insertOne({
    webtoonId: ObjectId('6625dfb9d5cc032117692058'),
    userId: ObjectId('6625df6ec32676e476f8133d'),
    episodeId: ObjectId('6625dfca4a316a4a204f6bb0'),
    createAt: new Date(),
    isNew: true, // 첫 조회 여부 (true: 신규, false: 재시청)
});

// bookmarks 컬렉션 생성
use('our_all_webtoon');
db.createCollection('bookmark');
// 북마크 데이터
db.getCollection('bookmark').insertOne({
    userId: ObjectId('637f5935a63146f4c3b32879'), // users 컬렉션의 일반 회원 ID
    webtoonId: ObjectId('637f5935a63146f4c3b32879'), // webtoons 컬렉션의 웹툰 ID
    createdAt: new Date(),
});
