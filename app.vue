<template>
  <div>
    <h1>I am {{ name }}</h1>

    <div v-if="pendingProjects">Loading projects...</div>
    <div v-else>
      <h2>Projects</h2>
      <ul>
        <li v-for="project in projects" :key="project.name">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
        </li>
      </ul>
    </div>

    <div v-if="pendingBlogs">Loading blogs...</div>
    <div v-else>
      <h2>Blogs</h2>
      <ul>
        <li v-for="blog in blogs" :key="blog.title">
          <h3>{{ blog.User_id }}</h3>
          <p>{{ blog.User_name }}</p>
          <!--<p>{{ blog.date }}</p>-->
        </li>
      </ul>
    </div>
  </div>
  <div>
    <h1>Create a New Project</h1>
    <form @submit.prevent="createProject">
      <div>
        <label for="name">Project Name:</label>
        <input type="text" v-model="newProject.name" id="name" required />
      </div>
      <div>
        <label for="description">Project Description</label>
        <textarea v-model="newProject.description" id="descirption" required placeholder="Project Details"></textarea>
        <!--Anything for v-model.description and v-model.name go to the const newPeoject name and description-->
      </div>
      <button type="submit">Create the Project</button>
    </form>

  </div>
  <div>
    <h1>Update a Project</h1>
    <form @submit.prevent="updateProject">
      <div>
        <label for="id">Project Id:</label>
        <input type="text" v-model="newUpdate.id" id="id" required/>
      </div>
      <div>
        <label for="name">New Project Name (Optional):</label>
        <input type="text" v-model="newUpdate.name" id="name" />
      </div>
      <div>
        <label for="description">New Project Description (Optional):</label>
        <textarea v-model="newUpdate.description" id="description" placeholder="Project Details"></textarea>
      </div>
      <button type="submit">Update the Project</button>
    </form>
  </div>

  <div>
    <h1>Delete a Project</h1>
    <form @submit.prevent="deleteProject">
      <div>
        <label for="id">Project Id:</label>
        <input type="text" v-model="newDelete.id" id="id" required/>
      </div>
      <button type="submit">Delete the Project</button>
    </form>
  </div>
</template>



<script setup>
  import { ref, onMounted } from 'vue';
  import useFetch from './useFetch'; 

  const name = "Dewmin";

  const { data: projects, pending: pendingProjects, error: errorProjects } = useFetch("http://localhost:5000/projects");

  const { data: blogs, pending: pendingBlogs, error: errorBlogs } = useFetch("http://localhost:5000/blogs");

  const newProject= ref({//this is a method(const are always method)
    name: "",
    description: "",

  });

  const createProject= async()=>{
    console.log(newProject.value);

    try{
      //This is the API request by using fetch, and same as POST request
      const response =await fetch('http://localhost:5000/projects',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(newProject.value),//like an pointer
      });
      if(!response.ok){
        throw new Error('Failed to create the project');
      }
      const result= await response.json();//Make the request like clicking the send button
      projects.value.push(result);//Push the new value to the previous project list 

      newProject.value.name='';
      newProject.value.description='';
    }catch(error){
      console.error('Error:',error);
    }
    
  };

  const newUpdate = ref({
    id: "",
    name: "",
    description: "",
  });

  const updateProject = async () => {
    console.log(newUpdate.value);

    try {
      const response = await fetch(`http://localhost:5000/projects/${newUpdate.value.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUpdate.value.name,
          description: newUpdate.value.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the project');
      }

      const result = await response.json();
      const index = projects.value.findIndex(project => project.id === newUpdate.value.id);
      if (index !== -1) {
        projects.value[index] = result;//update part
      }

      newUpdate.value.id = "";
      newUpdate.value.name = "";
      newUpdate.value.description = "";
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const newDelete = ref({
    id: "",
  });


  const deleteProject = async () => {
    console.log(newDelete.value);

    try {
      const response = await fetch(`http://localhost:5000/projects/${newDelete.value.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the project');
      }

      
      const index = projects.value.findIndex(project => project.id === newDelete.value.id);
      if (index !== -1) {//this removes the project from the list
        projects.value.splice(index, 1);
      }

      newDelete.value.id = '';
    } catch (error) {
      console.error('Error:', error);
    }
  };
</script>



<style scoped>
</style>
