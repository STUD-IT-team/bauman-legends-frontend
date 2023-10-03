<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'

border = 1px solid colorBorder

.root-form
  border border
  border-radius borderRadiusL
  padding 20px
  .input-container
    position relative
    label
      font-medium()
    input
      all unset
      width 100%
      border border
      padding 10p 5px
      font-medium()
      &::placeholder
        display none

    .placeholder
    .error
    .success
      position absolute
</style>

<template>
  <div class="root-form">
    <div class="input-container" v-for="[fieldName, field] in Object.entries(fields)" :class="{error: field.__error, success: field.__success}">
      <label :for="`${uid}-${fieldName}`">{{ field.name }}</label>
      <input v-bind="field" :id="`${uid}-${fieldName}`" v-model="field.value">
      <div class="info" v-if="field.info">{{ field.info }}</div>
      <div class="placeholder">{{ field.placeholder }}</div>
      <div class="error">{{ field.errorText || 'Ошибка' }}</div>
      <div class="success">{{ field.successText || 'Успех' }}</div>
    </div>
    <button class="success" @click="submit">{{ submitText || 'Отправить' }}</button>
  </div>
</template>

<script>
export default {
  emits: ['success', 'error'],

  props: {
    fields: {
      type: Object,
      required: true,
      default: {
        some_field: {
          name: String(),
          errorText: String(),
          successText: String(),
          value: String(),
          regExp: RegExp,
          validator: Function(), // (Any) => Boolean
          required: Boolean,

          type: String(),
          placeholder: String(),
          //other <input> attributes: String()
        }
      }
    },
    submitText: String,
    setSuccesses: Boolean,
  },

  data() {
    return {
      uid: Math.random(),
    }
  },

  methods: {
    submit() {
      let res = true;
      this.fields.forEach(field => {
        if (field.validationRegExp) {
          field.__error = !field.validationRegExp.test(field.value.trim());
        } else if (field.validator) {
          field.__error = !field.validator(field.value.trim());
        } else {
          field.__error = false;
        }
        field.__success = this.setSuccesses && !field.__error;
        res = res && !field.__error;
      });
      if (res) {
        const res = {}
        Object.entries(this.fields).forEach(([fieldName, field]) => res[fieldName] = field.prettifyResult ? field.prettifyResult(field.value) : field.value);
        this.$emit('success', res);
        return;
      }
      this.$emit('error');
    }
  }
}
</script>
