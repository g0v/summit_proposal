export const handleApiError = {
  methods: {
    async handleApiError(apiPromise, errMsg = "") {
      try {
        return await apiPromise;
      } catch (error) {
        const defaultMsg = [
          this.$createElement("p", "網站出了點問題，請稍後再試"),
          this.$createElement(
            "p",
            "Server temporary unavailable, please try again later"
          )
        ];
        this.$bvToast.toast(errMsg || defaultMsg, {
          toastClass: "err-toast",
          noCloseButton: true
        });
        return error;
      }
    }
  }
};
