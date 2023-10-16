<template>
  <header class="header">ПРОФИЛЬ</header>
  <div class="box user-block">
    <div class="user-name-row">
      <div class="user-name-id-block">
        <div class="user-name">{{ $user.name }}</div>
        <div class="user-id">#{{ String($user.id || '').padStart(4, '0') }}</div>
      </div>
      <button class="copy-id-button" @click="copyToClipboard($user.id, 'Твоё ID')"><img src="../res/images/copy.svg" alt=""></button>
      <button class="button-edit" @click="changeUserParam('name')">Изменить</button>
    </div>
    <div class="data-row">
      <div class="field">Группа:</div>
      <div class="data">{{ $user.group }}</div>
      <button class="button-edit" @click="changeUserParam('group')">Изменить</button>
    </div>
    <div class="data-row">
      <div class="field">Email:</div>
      <div class="data">{{ $user.email }}</div>
      <button class="button-edit" @click="changeUserParam('email')">Изменить</button>
    </div>
    <div class="data-row">
      <div class="field">Telegram:</div>
      <div class="data">@{{ $user.tg }}</div>
      <button class="button-edit" @click="changeUserParam('telegram', 'tg')">Изменить</button>
    </div>
    <div class="data-row">
      <div class="field">Вконтакте:</div>
      <div class="data">vk.com/{{ $user.vk }}</div>
      <button class="button-edit" @click="changeUserParam('vk')">Изменить</button>
    </div>
    <div class="data-row">
      <div class="field">Номер телефона:</div>
      <div class="data">{{ $user.phone }}</div>
      <button class="button-edit" @click="changeUserParam('phone_number', 'phone')">Изменить</button>
    </div>

    <div class="buttons-row">
      <router-link :to="{name: 'changePassword'}" style="opacity: 0; pointer-events: none;">
        <button class="change-password">Сменить пароль</button>
      </router-link>

      <button class="logout-button" @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
import {Validators} from "~/utils/validators";

export default {
  name: 'ProfileInfo',
  methods: {

    async changeUserParam(fieldName, fieldNameUser=fieldName, overrideHavingValue=null) {
      const newUserData = {
        name: this.$user.name,
        group: this.$user.group,
        telegram: this.$user.tg,
        vk: this.$user.vk,
        email: this.$user.email,
        phone_number: this.$user.phone,
      };
      const inputValue = await this.$modals.prompt(overrideHavingValue ? "Неверный формат" : "Изменить значение поля", "Введите новое значение", overrideHavingValue || newUserData[fieldName]);
      if (!inputValue) {
        return;
      }
      if (!Validators[fieldNameUser].validate(inputValue)) {
        this.changeUserParam(fieldName, fieldNameUser, inputValue);
        return;
      }

      newUserData[fieldName] = Validators[fieldNameUser].prettifyResult(inputValue);
      const {ok} = await this.$api.editProfile(newUserData.name, newUserData.group, newUserData.telegram, newUserData.vk, newUserData.email, newUserData.phone_number);
      if (!ok) {
        this.$popups.error(`Не удалось изменить значение поля ${fieldName}`);
        return;
      }
      this.$user[fieldNameUser] = newUserData[fieldName];
    },

    async logout() {
      this.loading = true;
      const {data, code, ok} = await this.$api.logout();
      this.loading = true;

      if (!ok) {
        this.$popups.error('Не получилось выйти из аккаунта', 'Неизвестная ошибка');
        return;
      }
      this.$store.dispatch("DELETE_USER");
      this.$router.push({name: "login"});
    },

    copyToClipboard(str, description) {
      navigator.clipboard.writeText(str);
      this.$popups.success("Скопировано", `${description} скопировано в буфер обмена`)
    }

  }
}
</script>

<style scoped lang="stylus">

button-edit()
  content "Изменить"
  button()
  width auto
  margin 0
  padding 0
  background colorBg
  font-small-extra()
  color colorBgLightExtra

button-copy()
  button-edit()
  opacity 0.6
  transition all 0.2s ease
  img
    width 20px
    height 20px
  &:hover
    opacity 1

.header
  font-large()
  font-bold()
  margin 0 20px 10px 20px
  color colorBg

.box
  background-color colorBg
  border-radius borderRadiusM
  padding 20px
  padding-top 10px
  margin 10px 0
  text-align left
  align-content left
  font-medium()
  color colorText1

  &.user-block
    .user-name-row
    .data-row
      display flex
      flex-wrap wrap
      margin 10px 0
      .field
        @media(max-width: 400px)
          width 100%
        color colorBgLightExtra
      .data
        flex 1
        margin-left 10px
        color colorText1
      .button-edit
        button-edit()
        text-align right
    .user-name-row
      justify-content space-between
      .user-name-id-block
        margin 5px 0
        .user-name
          font-large()
          font-bold()
          @media({desktop})
            margin-right 10px
        .user-id
          font-small()
          color colorText4
          display inline-block
          @media({mobile})
            display block
            font-small-extra()
      .copy-id-button
        button-copy()
        flex 1
        justify-content flex-start
        padding 0 10px

    .buttons-row
      display flex
      justify-content space-between
      align-items center

      .change-password
      .logout-button
        button()
        margin 0
        width unset
        color colorEmp1
        background colorBg
        padding 10px 20px
      .logout-button
        color colorError
</style>