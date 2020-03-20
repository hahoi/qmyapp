<template>
  <q-page class="flex flex-center cont">
    <q-card class="my-card">
      <!-- <q-card-section>
        <div class="text-h6 text-center">My APP</div>
      </q-card-section>-->

      <q-card-section>
        <div class="q-gutter-xs">
          <q-input v-model="user.id" label="帳號" />
          <q-input v-model="user.password" :type="isPwd ? 'password' : 'text'" label="密碼">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-separator dark />

      <q-card-actions align='center'>
        <q-btn class="full-width bg-primary text-white" label="登入" @click="testStoreCommit"></q-btn>
        <div>
          還沒有帳號？
          <q-btn flat class="text-deep-orange" label="立即註冊" to="/Signup"></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import Router from "../router/index";
import { powerRouter } from "../router/routes.js";
import { dbFirestore, dbAuth } from "../fb";

export default {
  name: "Login",
  data() {
    return {
      user: {
        id: "",
        password: ""
      },
      isPwd: true,
      department: []
    };
  },
  mounted() {
    // console.log(this.$store.state.userId);
    // dbFirestore
    //   .collection("SettingData")
    //   .doc("Department") //單位
    //   .get()
    //   .then(doc => {
    //     let temp = doc.data().depart;
    //     temp
    //       .sort(function(a, b) {
    //         return a.order - b.order; //小的排在前面，注意字串排序，用減號 不是 <
    //       })
    //       .forEach(item => {
    //         this.department.push(item.title);
    //       });
    //   });
  },
  methods: {
    testStoreCommit() {
      this.$store.commit("setUserId", "new powerRouter");
      console.log(powerRouter);
      this.$router.addRoutes(powerRouter);
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

    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
.cont
  // height: 94vh
  background: -webkit-gradient(linear, 80% 20%, 10% 21%, from(#B896CE), to(#82B0C0))</style>
