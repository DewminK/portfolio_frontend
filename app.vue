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
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import useFetch from './useFetch'; 

  const name = "Dewmin";

  const { data: projects, pending: pendingProjects, error: errorProjects } = useFetch("http://localhost:5000/projects");

  const { data: blogs, pending: pendingBlogs, error: errorBlogs } = useFetch("http://localhost:5000/blogs");
</script>


<style scoped>
</style>
