window.addEventListener("DOMContentLoaded", () => {
    let git_hub_link = "https://api.github.com/users/"
    console.log(git_hub_link);
    axios.get("https://api.github.com/users/shokhDeveloper").then((response) => {
        let result = response
        console.log(result);
        render([result.data])
    })
    let template = renderElement("template").content
    let boxes = renderElement(".boxes")
    let render = (e) => {
        boxes.innerHTML = null
        let input = renderElement("input").value = null
        e.forEach(item => {
            let clone = template.cloneNode(true)
            let img = clone.querySelector("img")
            img.src = item.avatar_url
            let name = clone.querySelector("h4")
            name.textContent = "Name: " + item.login
            let repositor = clone.querySelector("h5")
            repositor.textContent = "Repositories: " + item.public_repos
            let profile_btn = clone.querySelector("a")
            profile_btn.href = item.html_url
            boxes.append(clone)
            console.log(item);
        });
    }
    let form = renderElement("form")
    const handleSub = async (e) => {
        e.preventDefault()
        let data = new FormData(e.target)
        let input = data.get("input")
        let json = await axios({
            methode: "GET",
            url: git_hub_link + input
        }).catch((error) => {
            let h1 = createTag("h1")
            h1.textContent = "Topilmadi !"
            boxes.innerHTML = h1.textContent
            boxes.style.color = "red"
        })
        let result = json.data
        console.log(result);
        render([result])
    }
    form.addEventListener("submit", handleSub)
})