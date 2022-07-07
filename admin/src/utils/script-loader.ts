function loadScript(url: string) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script');
    script.type = "text/javascript";


    script.onload = function () {
      resolve('success: ' + url);
    }

    script.onerror = function () {
      reject(Error(url + 'load error!'));
    };

    script.src = url;
    document.body.appendChild(script);

  });
}
export default loadScript;

