<template>
  <q-page class="flex flex-center cont">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-center">註冊新帳號</div>
      </q-card-section>

      <q-card-section>
        <div class="q-gutter-md">
          <form
            ref="form"
            @submit.prevent.stop="onSubmit"
            @reset.prevent.stop="onReset"
            class="q-gutter-md"
          >
            <q-input
              ref="email"
              v-model="user.email"
              label="E-mail"
              :rules="[rules.required, rules.email]"
            />
            <q-input ref="name" v-model="user.name" label="姓名" :rules="[rules.required]" />
            <q-input ref="alias" v-model="user.alias" label="登入代號" :rules="[rules.required]" />
            <q-select
              ref="department"
              v-model="user.department"
              :options="department"
              label="單位名稱"
              :rules="[rules.required]"
            />
            <q-input
              ref="telephone"
              v-model="user.telephone"
              label="連絡電話"
              :rules="[rules.required]"
            />

            <q-input
              ref="password1"
              v-model="password1"
              :type="isPwd ? 'password' : 'text'"
              label="密碼"
              :rules="[rules.min]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-input
              ref="password2"
              v-model="password2"
              :type="isPwd ? 'password' : 'text'"
              label="再輸入相同的密碼"
              :rules="[rules.min, rules.passwordMath]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn label="註冊" type="submit" color="primary" />
            <q-btn
              label="返回"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
              @click="$router.go(-1)"
            />
          </form>
        </div>
      </q-card-section>

      <q-separator dark />

      <!-- <q-card-actions align="right">
        <q-btn label="註冊" type="submit" color="primary" />
        <q-btn
          label="返回"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          @click="$router.go(-1)"
        />
      </q-card-actions>-->
    </q-card>
  </q-page>
</template>

<script>
import { dbFirestore, dbAuth, dbFunctions } from "../fb";
import { Notify } from 'quasar'

export default {
  data() {
    return {
      department: [],
      password1: "",
      password2: "",
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
      formHasError: true,
      rules: {
        required: value => !!value || "這個欄位必須要輸入",
        min: v => v.length >= 6 || "最少需要6個字元",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "不合格式的 e-mail.";
        },
        length: len => v => (v || "").length <= len || `最多${len}個字元`,
        password: v =>
          (v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) || "密碼必須包含大寫英文、數字、特殊字元",
        passwordMath: v => v === this.password1 || "密碼必須相同"
        // emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  mounted() {
    dbFirestore
      .collection("SettingData")
      .doc("Department") //單位
      .get()
      .then(doc => {
        let temp = doc.data().depart;
        temp
          .sort(function(a, b) {
            return a.order - b.order; //小的排在前面，注意字串排序，用減號 不是 <
          })
          .forEach(item => {
            this.department.push(item.title);
          });
      });
  },
  methods: {
    onSubmit() {
      this.$refs.email.validate();
      this.$refs.name.validate();
      this.$refs.alias.validate();
      this.$refs.department.validate();
      this.$refs.telephone.validate();
      this.$refs.password1.validate();
      this.$refs.password2.validate();
      if (
        this.$refs.email.hasError ||
        this.$refs.name.hasError ||
        this.$refs.alias.hasError ||
        this.$refs.department.hasError ||
        this.$refs.telephone.hasError ||
        this.$refs.password1.hasError ||
        this.$refs.password2.hasError
      ) {
        this.formHasError = true;
        this.$q.notify({
          icon: 'error',
          color: 'negative',
          position: 'center',
          message: '有錯誤'
        })
      } else{
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted'
        })

      }

      // console.log(this.$refs.email.validate());
    },
    onReset() {}
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  // height: 100vh
  max-width: 600px
.cont
  // height: 94vh
  background: -webkit-gradient(linear, 80% 20%, 10% 21%, from(#B896CE), to(#82B0C0))
</style>
