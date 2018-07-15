<template>
  <div class="exception_403"
    v-wechat-title="'403'">
    <div class="imgBlock">
      <div class="imgEle"></div>
    </div>
    <div class="content">
      <h2>403</h2>
      <div class="desc">抱歉，你无权访问该页面</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.exception_403 {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .imgBlock {
    width: 443px;
    padding-right: 152px;
    .imgEle {
      width: 100%;
      height: 340px;
      background: url('~@/assets/img/403@2x.png') no-repeat 50% 50%;
      background-size: contain;
    }
  }
  .content {
    h2 {
      margin: 0 0 24px 0;
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
      white-space: nowrap;
    }
    .btn {
      height: 32px;
      padding: 0 15px;
    }
  }
}
@media screen and (max-width: 1200px) {
  .exception_403 {
    .imgBlock {
      padding-right: 88px;
    }
  }
}
</style>
