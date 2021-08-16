function update()
{
    fetch("http://localhost/api/login")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    });
}