module.exports = {
  jsonImport: (page) => {
    var jsonArray = {};
    var jsonData = {};
    if (page == "index") {
      const dataContext = require.context('./index', true, /\.json$/);


      
      dataContext.keys().forEach((key) => {
        const fileName = key.match(/\/([^/]+)\.json$/)[1];
        jsonData[fileName] = dataContext(key);
      });
      
      console.log(jsonData); // 现在data对象包含了所有JSON文件的内容    
    //   var moduleFiles = import.meta.glob("./index/*.json", {
    //     eager: true,
    //   });

      // jsonArray = Object.keys(moduleFiles).map((path) => {
      //   const module = moduleFiles[path];
      //   const fileName = path?.split("/")?.pop(); // 提取文件名部分
      //   const trueFileName = fileName?.split(".")?.shift(); // 文件名不含后缀
      //   return {
      //     content: module.default, // 图片相对路径（/public/icon/DNS服务.sv g）
      //     name: trueFileName, // 文件名(带后缀)
      //   };
      // });
    }
    return jsonData;
  },
};
