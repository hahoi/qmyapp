<template>
  <q-page class="flex flex-center cont">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-center">註冊新帳號</div>
      </q-card-section>

      <q-card-section>
        <div class="q-gutter-md">
          <form>
            <q-input v-model="user.email" label="E-mail" :rules="[rules.required, rules.email]" />
            <q-input v-model="user.id" label="帳號" :rules="[rules.required]" />
            <q-input v-model="user.password" :type="isPwd ? 'password' : 'text'" label="密碼">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </form>
        </div>
      </q-card-section>

      <q-separator dark />

      <q-card-actions align="right">
        <q-btn label="註冊" type="submit" color="primary" />
        <q-btn
          label="返回"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          @click="$router.go(-1)"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      user: {
        //使用者資料
        authId: "",
        email: "",
        name: "",
        alias: "",
        department: "",
        telephone: "",
        role: [], //角色權限
        state: "",
        memo: ""
      },
      isPwd: true,
      rules: {
        required: value => !!value || "這個欄位必須要輸入",
        min: v => v.length >= 8 || "最少需要8個字元",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "不合格式的 e-mail.";
        },
        length: len => v => (v || "").length <= len || `最多${len}個字元`,
        password: v =>
          (v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) || "密碼必須包含大寫英文、數字、特殊字元",
        passwordMath: v => v === this.password || "密碼必須相同"
        // emailMatch: () => "The email and password you entered don't match"
      }
    };
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  height: 100vh
  max-width: 600px
.cont
  // height: 94vh
  background: -webkit-gradient(linear, 80% 20%, 10% 21%, from(#B896CE), to(#82B0C0))
.myform
  max-width: 300px
</style>
