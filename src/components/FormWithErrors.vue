<style lang="stylus" scoped>
  @require '../styles/FormWithErrors.styl'
</style>

<template>
  <div class="root-form" @keydown.enter="submit" @input="isSubmittedAlready ? checkFormat() : ''">
    <div class="input-container" v-for="[fieldName, field] in Object.entries(fields)" :class="{error: field.__error, success: field.__success}">
      <label :for="`${uid}-${fieldName}`">{{ field.title }}</label>
      <input v-bind="field" :id="`${uid}-${fieldName}`" v-model="field.value">
      <div class="info" v-if="field.info">{{ field.info }}</div>
      <div class="placeholder">{{ field.placeholder }}</div>
      <div class="error">{{ field.errorText || 'Неверный формат' }}</div>
      <div class="success">{{ field.successText || 'Успех' }}</div>
    </div>

    <button class="submit" @click="submit">{{ submitText || 'Отправить' }}</button>
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

      isSubmittedAlready: false,
    }
  },

  methods: {
    submit() {
      this.isSubmittedAlready = true;

      if (!this.checkFormat()) {
        this.$emit('error');
        return;
      }
      const res = {};
      Object.entries(this.fields).forEach(([fieldName, field]) => {
        const fieldValueTrimmed = field.type === 'text' ? field.value.trim() : field.value;
        res[fieldName] = field.prettifyResult ? field.prettifyResult(fieldValueTrimmed) : fieldValueTrimmed;
      });
      this.$emit('success', res);
    },

    checkFormat() {
      let res = true;
      Object.values(this.fields).forEach(field => {
        field.value = field.value || '';
        const validationText = field.type === 'text' ? field.value.trim() : field.value;
        if (field.validationRegExp) {
          field.__error = !field.validationRegExp.test(validationText);
        } else if (field.validator) {
          field.__error = !field.validator(validationText);
        } else {
          field.__error = false;
        }
        field.__success = this.setSuccesses && !field.__error;
        res = res && !field.__error;
      });
      return res;
    }
  }
}
</script>
