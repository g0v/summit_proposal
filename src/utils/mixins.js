import metaData from "@/utils/metaData.js";

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

export const addMetaData = {
  methods: {
    addMetaData(routeName) {
      document.title = metaData[routeName].title;

      let head = document.querySelector("head");
      let oldDescriptionMeta = document.querySelector("meta[name=description]");
      if (oldDescriptionMeta) {
        oldDescriptionMeta.remove();
      }
      let newOldDescriptionMeta = document.createElement("meta");
      newOldDescriptionMeta.setAttribute("name", "description");
      newOldDescriptionMeta.setAttribute(
        "content",
        metaData[routeName].description
      );
      head.appendChild(newOldDescriptionMeta);

      // 社群系列
      metaData[routeName].propertyMeta.forEach(meta => {
        let oldMeta = document.querySelector(
          `meta[property='${meta.property}']`
        );
        if (oldMeta) {
          oldMeta.remove();
        }
        let createMeta = document.createElement("meta");
        createMeta.setAttribute("property", `${meta.property}`);
        createMeta.setAttribute("content", `${meta.content}`);
        head.appendChild(createMeta);
      });
    }
  }
};
