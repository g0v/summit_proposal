# g0v Summit 2020 投稿系統前端

## 開發步驟

``` base
# Project setup
npm install

# Compiles and hot-reloads for development
npm run serve

# Run your tests
npm run test

# Lints and fixes files
npm run lint
```

1. dev branch === deploy to satging
2. master branch === deploy to production

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 更新討論區資料步驟

```bash
npm run cache:comment
git add src/assets/commentCache.json
git ci -m 'Update comment cache'
git push
```

## 編譯步驟

```bash
npm run build
```

## 相關文件與資訊

1. [Tech Spec](https://g0v.hackmd.io/ygurS4IbTP6m-XSMRfVoEg)
2. Materials:
   1. [各種徵件相關文案](https://g0v.hackmd.io/7WDoYrC9Tla0qqk8RlO4ow?view)
   2. [議程委員](https://g0v.hackmd.io/xfKZhpxkTcuoFlwvVGigwg)
   3. [徵件辦法](https://g0v.hackmd.io/iqKSTK42QXu3iRB2vGnLFw?view)
3. Staging: http://proposal.summit2020.pre-stage.cc/
4. Production: https://propose.summit2020.g0v.tw/
