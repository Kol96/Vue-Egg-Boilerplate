<template>
  <div class="container"
    v-wechat-title="'登录'">
    <div class="main">
      <!--登录模块-->
      <div class="login">
        <div class="header">
          <div class="title">登录页面</div>
        </div>
        <el-form class="login-form"
          :model="loginInfo"
          :rules="loginRules"
          ref="loginForm"
          @keyup.enter.native="login('loginForm')">
          <el-form-item prop="username"
            ref="username">
            <el-input class="form-input"
              type="text"
              placeholder="账户"
              v-model="loginInfo.username"
              @focus="$refs['username'].clearValidate()">
              <i slot="prefix"
                class="el-input__icon icon-username"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password"
            ref="password">
            <el-input class="form-input"
              type="password"
              placeholder="密码"
              v-model="loginInfo.password"
              @focus="$refs['password'].clearValidate()">
              <i slot="prefix"
                class="el-input__icon icon-password"></i>
            </el-input>
          </el-form-item>
          <el-row class="login-checkbox-wrapper">
            <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
          </el-row>
          <el-row>
            <el-button type="primary"
              class="login-btn"
              :loading="loading"
              @click="login('loginForm')">登录</el-button>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <div class="copyright"></div>
    </div>
  </div>
</template>

<script>
import { getStrLength } from '@/utils'
import localStorage from '@/utils/localStorage'

export default {
  data() {
    // 校验用户名
    const validateUsername = (rule, value, callback) => {
      const usernameReg = /[^\da-zA-Z\-_]/g
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (getStrLength(value) > 20) {
        callback(new Error('账号长度应小于20位'))
      } else if (usernameReg.test(value)) {
        callback(new Error('账号只允许存在英文、数字、下划线、横线'))
      } else {
        callback()
      }
    }
    // 校验密码
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (getStrLength(value) < 6) {
        callback(new Error('密码长度应大于或等于6位'))
      } else if (getStrLength(value) > 20) {
        callback(new Error('密码长度应小于或等于20位'))
      } else {
        callback()
      }
    }
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      },
      rememberMe: false,
      autoLogin: false,
      loading: false
    }
  },
  created() {
    // 初始化自动登录与记住用户名
    if (localStorage.isSupported) {
      if (localStorage.get('autoLogin') === '1') {
        this.autoLogin = true
      }
    }
  },
  methods: {
    // 登录
    login(formName) {
      if (localStorage.isSupported) {
        // 自动登录
        if (this.autoLogin) {
          localStorage.set('autoLogin', '1')
        } else {
          localStorage.remove('autoLogin')
        }
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const userInfo = {
            username: this.loginInfo.username,
            password: this.loginInfo.password,
            autoLogin: this.autoLogin
          }
          this.$store
            .dispatch('LoginByUsername', userInfo)
            .then(() => {
              this.$router.push({ path: '/' })
              this.loading = false
            })
            .catch((e) => {
              this.loading = false
              this.$message.error(e.message)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/*布局样式*/
.container {
  width: 100%;
  height: 100vh;
  background: #f0f3f7;
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 44px);
  }
  .footer {
    height: 44px;
    text-align: center;
    color: #000;
    opacity: 0.45;
    .copyright {
      line-height: 20px;
    }
  }
}
/*登录模块*/
.login {
  width: 368px;
  min-height: 310px;
  /*标题*/
  .header {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 24px;
    padding: 0 43px;
    line-height: 24px;
    color: #1890ff;
    .title {
      white-space: nowrap;
      font-size: 24px;
    }
  }
  /*登录表单*/
  .login-form {
    .form-input {
      font-size: 16px;
    }
    .login-checkbox-wrapper {
      margin-bottom: 24px;
      .el-checkbox {
        line-height: 22px;
        height: 22px;
      }
    }
    .login-btn {
      width: 100%;
      height: 40px;
      font-size: 16px;
    }
  }
}
</style>

<style lang="scss">
.login {
  .el-form-item {
    margin-bottom: 24px;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 36px;
  }
  .el-form-item.is-success .el-input__inner {
    border-color: #dcdfe6;
  }
  .el-checkbox__label {
    padding-left: 8px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
