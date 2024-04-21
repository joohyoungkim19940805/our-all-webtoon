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
    profile_image: '',
    email: 'oozu1994@gmail.com',
    password: '1234',
    age: 30,
    gender: 'male',
    created_at: new Date(),
    is_enabled: true,
});
// 카카오톡 로그인 회원
db.getCollection('account').insertOne({
    provider: 'kakao',
    providerId: '123456789',
    accessToken: 'kakaoAccessToken',
    refreshToken: 'kakaoRefreshToken',
    nickname: '카카오닉네임',
    profileImage: 'https://kakao.com/profile/123456789',
    created_at: new Date(),
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
use('our_all_webtoon')
db.getCollection('genres').insertOne({
    name: "드라마",
    description: "인간 관계와 감정을 다루는 웹툰",
    createdAt: new Date()
});


use('our_all_webtoon');
db.createCollection('webtoon');
db.getCollection('webtoon').insertOne({
    title: '아마추어 작가의 꿈',
    synopsis:
        '웹툰 제작에 대한 열정을 가진 아마추어 작가가 꿈을 향해 나아가는 이야기',
    author: ObjectId('637f5935a63146f4c3b32879'), // users 컬렉션의 일반 회원 ID
    genre: '드라마',
    thumbnail: 'https://example.com/thumbnail.jpg',
    createdAt: new Date(),
});

db.getCollection('episodes').insertOne({
    webtoonId: ObjectId("637f5935a63146f4c3b32879"), // webtoons 컬렉션의 웹툰 ID
    episodeNumber: 1,
    title: "첫 번째 에피소드",
    content: "웹툰 제작을 시작하는 주인공",
    subtitle: '웹툰 제작에 대한 열정을 가진 아마추어 작가의 이야기',
    images: [
        "https://example.com/episode1_image1.jpg",
        "https://example.com/episode1_image2.jpg"
    ],
    createdAt: new Date()
});


// rankings 컬렉션 생성
use('our_all_webtoon');
db.createCollection('rankings');
db.getCollection('rankings').insertOne({
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
db.createCollection('boards');
// 공지사항 게시글
db.getCollection('boards').insertOne({
    type: 'notice',
    content: '웹툰 사이트 오픈 안내',
    author: ObjectId('637f5935a63146f4c3b32879'), // users 컬렉션의 일반 회원 ID
    comments: [],
    createdAt: new Date(),
});

// 작가 피드 게시글
db.getCollection('boards').insertOne({
    type: 'author_feed',
    content: '새로운 회차 업로드했습니다!',
    author: ObjectId('637f5935a63146f4c3b32879'), // users 컬렉션의 일반 회원 ID
    comments: [],
    createdAt: new Date(),
});

// bookmarks 컬렉션 생성
use('our_all_webtoon');
db.createCollection('bookmarks');
// 북마크 데이터
db.getCollection('bookmarks').insertOne({
    userId: ObjectId('637f5935a63146f4c3b32879'), // users 컬렉션의 일반 회원 ID
    webtoonId: ObjectId('637f5935a63146f4c3b32879'), // webtoons 컬렉션의 웹툰 ID
    createdAt: new Date(),
});
