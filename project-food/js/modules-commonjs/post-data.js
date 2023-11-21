function postData() {
  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: data,
    });
  
    return await result.json();
  };
}

module.exports = postData;