let editEditor;

ClassicEditor
  .create(document.querySelector('.edit-editor'), {
    contentsCss: '../public/css/index.css'
  })
  .then(ckEditor => {
    editEditor = ckEditor;
  })
  .catch(error => {
    console.error(error);
  });

  const editBlogPostForm = async (event) => {
    event.preventDefault();
  
    const editBlogTitle = $('#edit-blog-title').val();
    const editBlogContent = editEditor.getData();
    const editBlogId = $('#edit-blog-id').val();
  
    //check if title and content are empty
    if ( editBlogTitle === '' && editBlogContent === '' ) {
      alert('Please enter a title and content for your blog post');
      return;
    };
  
    // empty object to store updated blog post data
    const blogPostData = {};
  
    if (editBlogTitle) {
      blogPostData.blog_title = editBlogTitle;
    };
  
    if (editBlogContent) {
      blogPostData.blog_content = editBlogContent;
    };
  
    console.log(blogPostData);
    
    const response = await fetch(`/api/edit-blog/${editBlogId}`, {
      method: 'PUT',
      body: JSON.stringify(blogPostData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      alert('Blog post updated!');
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog post');
    };
  
  };
  
  $('#edit-blog-form').submit(editBlogPostForm);