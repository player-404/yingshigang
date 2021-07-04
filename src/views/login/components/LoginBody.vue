<template>
  <div class="loginBody">
    <div class="login-container" :class="{ move: isMove }">
      <!-- 登陆表单 -->
      <div class="sign-in">
        <transition
          enter-active-class="animate__animated animate__bounceInRight"
          leave-active-class="animate__animated animate__rotateOutDownLeft animate__faster"
        >
          <div class="in-body" v-show="!isMove">
            <h1 class="in-title">登陆</h1>
            <div class="in-form">
              <ipt tips="请输入手机号/邮箱" @values="userAccount"/>
              <ipt title="密码" class="ipt" type="password" tips="请输入密码" @values="userPass">
                <template #iconImg>
                  <img
                    src="@/assets/images/pass.png"
                    style="width: 100%; height: 100%"
                  />
                </template>
              </ipt>
            </div>
            <div class="submit">
              <button class="in-btn" @click="login">登陆</button>
            </div>
          </div>
        </transition>
      </div>
      <!-- 表单切换 -->
      <div class="sign-up">
        <transition
          enter-active-class="animate__animated animate__fadeInUp"
          leave-active-class="animate__animated animate__fadeOutDown"
        >
          <div class="up-body" v-if="!isMove">
            <h1>没有账号？</h1>
            <div class="up-button">
              <button class="up-btn" @click="leftMove">注册</button>
            </div>
          </div>
          <div class="up-body" v-else>
            <h1>已有账号？</h1>
            <div class="up-button">
              <button class="up-btn" @click="rightMove">登陆</button>
            </div>
          </div>
        </transition>
      </div>
      <!-- 注册表单 -->
      <div class="up-form">
        <transition
          enter-active-class="animate__animated animate__bounceInRight"
          leave-active-class="animate__animated animate__fadeOutRight"
        >
          <div class="form-body" v-if="isMove">
            <h1 class="form-title">注册</h1>
            <div class="form-username">
              <i class="icon"><img src="@/assets/images/user.png" /></i>
              <input
                type="text"
                placeholder="请输入手机号/邮箱"
                @blur="userBlur"
                v-model="account"
              />
              <div class="tips-container">
                <transition
                  enter-active-class="animate__animated animate__shakeX"
                >
                  <div
                    class="error-text"
                    v-if="!accountStatus && accountStatus != null"
                  >
                    注册账号格式有误
                  </div>
                </transition>
              </div>
              <div class="error" v-if="accountStatus != null">
                <transition
                  enter-active-class="animate__animated animate__fadeInUp"
                >
                  <i class="error" v-if="!accountStatus"
                    ><img src="@/assets/images/error.png"
                  /></i>
                  <i class="error" v-else
                    ><img src="@/assets/images/right2.png"
                  /></i>
                </transition>
              </div>
            </div>
            <div class="form-password">
              <i class="icon"><img src="@/assets/images/pass.png" /></i>
              <input
                type="password"
                placeholder="请输入密码"
                @blur="passBlur"
                v-model="password"
              />
              <div class="error" v-if="passStatus != null">
                <transition
                  enter-active-class="animate__animated animate__fadeInUp"
                >
                  <i class="error" v-if="!passStatus"
                    ><img src="@/assets/images/error.png"
                  /></i>
                  <i class="error" v-else
                    ><img src="@/assets/images/right2.png"
                  /></i>
                </transition>
              </div>
              <div class="tips-container">
                <transition
                  enter-active-class="animate__animated animate__shakeX"
                >
                  <div
                    class="error-text"
                    v-if="!passStatus && passStatus != null"
                  >
                    密码不能为空且大于六位
                  </div>
                </transition>
              </div>
            </div>
            <div class="form-password">
              <i class="icon"><img src="@/assets/images/pass.png" /></i>
              <input
                type="password"
                placeholder="请确认输入密码"
                v-model="checkPass"
                @blur="checkBlur"
              />
              <div class="error" v-if="checkStatus != null">
                <transition
                  enter-active-class="animate__animated animate__fadeInUp"
                >
                  <i class="error" v-if="!checkStatus"
                    ><img src="@/assets/images/error.png"
                  /></i>
                  <i class="error" v-else
                    ><img src="@/assets/images/right2.png"
                  /></i>
                </transition>
              </div>
              <div class="tips-container">
                <transition
                  enter-active-class="animate__animated animate__shakeX"
                >
                  <div
                    class="error-text"
                    v-if="!checkStatus && checkStatus != null"
                  >
                    两次密码不一致
                  </div>
                </transition>
              </div>
            </div>
            <div class="form-btn">
              <button @click="submit">提交</button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Ipt from "./Input.vue";
import { ElMessage } from "element-plus";
import md5 from "md5";
import { useRouter } from "vue-router";
import { docCookies } from '@/utils/tool'
import { Stroage } from '@/types/index'
export default defineComponent({
  components: {
    Ipt,
  },
  setup() {
    let isMove = ref<boolean>(false);
    let account = ref<string>("");
    let accountStatus = ref<boolean | null>(null);
    let password = ref<string>("");
    let passStatus = ref<boolean | null>(null);
    let checkPass = ref<string>("");
    let checkStatus = ref<boolean | null>(null);
    let loginUsername = ref<string>('');
    let loginPass = ref<string>('');
    const router = useRouter();
    //左移动
    function leftMove(): void {
      isMove.value = true;
    }
    //右移动
    function rightMove(): void {
      isMove.value = false;
    }
    //账号
    function userBlur(): void {
      const phone: RegExp = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      const email: RegExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isPhone: boolean = phone.test(account.value);
      let isEmail: boolean = email.test(account.value);
      accountStatus.value = isPhone || isEmail;
    }
    //密码
    function passBlur(): void {
      passStatus.value =
        password.value && password.value.length >= 6 ? true : false;
    }
    //确认密码
    function checkBlur(): void {
      checkStatus.value =
        checkPass.value === password.value && password.value ? true : false;
    }
    //提交表单
    function submit(): void {
      //注册
      if (accountStatus.value && passStatus.value && checkPass.value) {
        //查询是否存在账号
        if (localStorage.getItem(account.value)) {
          ElMessage({
          type: "warning",
          message: "账号已存在, 请登陆",
          duration: 2000,
        });
        return
        }
        //加密
        let passStr = md5(password.value);
        let obj: Stroage = {
          username: "",
          password: passStr,
          userAvatar: "",
          info: ""
        };
        //存储
        //URL编码,cookie规定一些特殊字符串不能存在
        let encodeStr = encodeURI(account.value);
        localStorage.setItem(account.value, JSON.stringify(obj));
        //设置cookie 记住登陆 7天
        docCookies.setItem('account', `${encodeStr}`, 604800, '/' );
        //消息发送
        ElMessage({
          type: "success",
          message: "注册成功",
          duration: 2000,
        });
        //跳转
        router.push({ name: "mine"});
        return;
      }
      ElMessage({
        type: "error",
        message: "账号或密码有误",
        duration: 2000,
      });
    }
    //账号
  function userAccount(value: string): void {
    loginUsername.value = value;
  }
  //密码
  function userPass(value: string): void {
    loginPass.value = value;
  }
    //login
    function login(): void {
      let data = localStorage.getItem(loginUsername.value);
      if (!data) {
        ElMessage({
          type: 'error',
          message: '账号或密码错误',
          duration: 2000
        })
        return;
      }
      let pass = md5(loginPass.value);
      if (JSON.parse(data).password != pass) {
        ElMessage({
          type: 'error',
          message: '账号或密码错误',
          duration: 2000
        })
        return
      }
      let encode = encodeURIComponent(loginUsername.value);
      docCookies.setItem('account', encode);
      router.push({name: 'mine'})
    }
    return {
      isMove,
      accountStatus,
      account,
      passStatus,
      password,
      checkPass,
      checkStatus,
      loginUsername,
      loginPass,
      leftMove,
      rightMove,
      userBlur,
      passBlur,
      checkBlur,
      submit,
      login,
      userAccount,
      userPass
    };
  },
});
</script>
<style lang="less" scoped>
.loginBody {
  width: 800px;
  height: 530px;
  background-color: rosybrown;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  border-radius: 14px;
  overflow: hidden;
  .login-container {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    &.move {
      transform: translateX(-50%);
    }
    .sign-in {
      width: 50%;
      height: 100%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      .in-body {
        width: 80%;
        .in-title {
          color: #000;
          text-align: center;
        }
        .in-form {
          width: 100%;
        }
        .submit {
          display: flex;
          justify-content: center;
          .in-btn {
            width: 100px;
            height: 40px;
            border-radius: 20px;
            border: none;
            background-color: #cf4a50;
            font-weight: bold;
            color: #fff;
            cursor: pointer;
            transition: background-color 1s, box-shadow 1s;
            &:hover {
              background-color: #30c1b4;
              box-shadow: 2px 2px 10px #30c1b4;
            }
          }
        }
      }
    }
    .sign-up {
      width: 50%;
      height: 100%;
      background-color: #29c7b9;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      position: relative;
      z-index: 9;
      .up-body {
        position: absolute;
        .up-button {
          margin-top: 30px;
          .up-btn {
            width: 100px;
            height: 40px;
            border-radius: 20px;
            background-color: transparent;
            border: 1px solid #fff;
            font-weight: bold;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
            transition: border 0.5s, background-color 0.5s;
            &:hover {
              border: 1px solid transparent;
              background-color: #cf4a50;
            }
          }
        }
      }
    }
    .up-form {
      width: 50%;
      height: 100%;
      background-color: #fff;
      position: relative;
      z-index: 9;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .form-body {
        width: 80%;
        .form-title {
          margin-bottom: 40px;
          text-align: center;
          color: #000;
        }
        .error {
          display: inline-block;
          width: 20px;
          height: 20px;
          position: absolute;
          right: 0;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          overflow: hidden;
          margin-right: 10px;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .tips-container {
          width: 100%;
          position: absolute;
          bottom: -30px;
          left: 0px;
          padding-left: 30px;
          .error-text {
            font-size: 14px;
            color: red;
          }
        }
        input {
          width: 80%;
          height: 30px;
          border: none;
          border-bottom: 1px solid #000;
          outline: none;
        }
        .form-username {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px;
          position: relative;
        }
        .form-password {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px;
          position: relative;
        }
        .form-btn {
          display: flex;
          justify-content: center;
          margin-top: 60px;
          border: 1px solid transparent;
          button {
            width: 100px;
            height: 40px;
            border-radius: 20px;
            border: none;
            background-color: #29c7b9;
            font-size: 16px;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: box-shadow 0.5s;
            &:hover {
              box-shadow: 2px 2px 10px #29c7b9;
            }
          }
        }
      }
    }
  }
}
</style>