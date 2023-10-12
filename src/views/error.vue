<template>
  <div>
    <input type="file" @change="handleFileChange" />
  </div>
</template>

<script>
import Docxtemplater from "docxtemplater";
import JSZip from "jszip";
export default {
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.processWordFile(file);
    },
    processWordFile(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        this.extractTextAndFormats(content);
      };
      reader.readAsArrayBuffer(file);
    },
    extractTextAndFormats(content) {
      JSZip.loadAsync(content)
        .then((zip) => {
          const doc = new Docxtemplater().loadZip(zip);
          const documentText = doc.getFullText();
          const formatTags = doc.getFormatTags();

          // Sử dụng documentText và formatTags theo nhu cầu của bạn
          console.log("Văn bản:", documentText);
          console.log("Các định dạng:", formatTags);
        })
        .catch((error) => {
          console.error("Lỗi khi tải tệp Zip:", error);
        });
    },
  },
};
</script>
