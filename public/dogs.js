//onclick function to delete a dog by id
async function deleteDog(id) {
  //delete a sauce matching parameter id
  let res = await fetch(`/dogs/${id}`, {
    method: "DELETE",
  });
  console.log(res);
  //send user back to the sauces path
  window.location.assign("/dogs");
}
