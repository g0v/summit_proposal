<template>
  <div class="form-container">
    <b-form @submit="onSubmit">
      <b-form-group
        label="姓名："
        label-for="name"
        description="此欄位為不公開姓名"
      >
        <b-form-input
          id="name"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="投稿形式" label-for="proposal_type">
        <b-form-select
          id="proposal_type"
          v-model="form.proposal_type"
          :options="proposalTypeOption"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="danger">確定</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "ProposalForm",
  data() {
    return {
      form: {
        name: "",
        proposal_type: ""
      },
      proposalTypeOption: ["演講", "主題論壇", "工作坊"]
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log("onSubmit");
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  padding: 50px 40px;
  box-shadow: 0 0 11px #6f3f3f;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  z-index: 2;
  form {
    text-align: left;
    background-color: #fff;
    button {
      box-shadow: -1px 6px 8px -3px black;
      position: absolute;
      bottom: -13px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
