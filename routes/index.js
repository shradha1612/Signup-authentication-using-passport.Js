const express = require('express');

const router = express.Router()

router.get('/',(req, res)=>res.render('welcome'))

module.exports = router


// <!-- partials    
// <% include ./partials/messages%>  
// alternative use what works for u -->

// <!--  -->
//         <!-- <%- include('messages');-%>   -->
//         <!-- <%-include('./partials/messages'); %> -->
//         <!-- <%-include('./partials/messages'); -%> -->
//         <!-- <%- include('./partials/messages')%> -->
//         <!-- <%- include ./partials/messages%>   -->