export async function imgurUpload(img: File) {
  try {
    const formdata = new FormData();
    formdata.append('image', img, img.name);
    formdata.append('type', 'file');
    formdata.append('title', 'Blog Image');
    formdata.append('description', 'Image for blog post.');

    const res = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      },
      body: formdata,
    });

    if (res.ok) {
      const data = await res.json();
      return data.data.link;
    }
  } catch (err) {
    console.log(err);
  }
}
