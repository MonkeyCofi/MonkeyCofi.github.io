let about_me_sections = document.querySelector('#about-me-achievements-education');
let about_me_text = document.querySelector('#about-me').querySelector('.body-text');
let parent_container = document.querySelector('.about-me-text');
const general_text = about_me_text.innerText;
const experience = document.getElementById('experience');
const achievements_text = "My time in 42 has taught me a lot of invaluable information. Here, programming is one aspect of learning, but the true lesson is for us to teach ourselves how to learn. \
					  I've had the pleasure of joining a few competitions here and there and even managed to place 3rd in a Capture the Flag cybersecurity competition.\
					  I'm currently in Circle 5 of the Common Core cursus. Here are some the projects I've completed so far, two of which are featured below: ";

console.log(general_text);

let buttons = about_me_sections.children;

for (let i = 0; i < buttons.length; i++)
{
	buttons.item(i).addEventListener('click', () => {
		switch(buttons.item(i).innerHTML)
		{
			case ('General'):
			{
				about_me_text.innerText = general_text;
				buttons.item(i).classList.add('about-me-selected');
				buttons.item(i + 1).classList.remove('about-me-selected');
				parent_container.appendChild(experience);
				break ;
			}
			case ('The Reflection Chamber'):
			{
				buttons.item(i).classList.add('about-me-selected');
				buttons.item(i - 1).classList.remove('about-me-selected');
				about_me_text.innerText = achievements_text;
				let ul = about_me_text.appendChild(document.createElement('ul'));
				let list_item = ul.appendChild(document.createElement('li'));
				list_item.innerText = "minishell";
				list_item = ul.appendChild(document.createElement('li'));
				list_item.innerText = "miniRT";
				list_item = ul.appendChild(document.createElement('li'));
				list_item.innerText = "pipex";
				parent_container.removeChild(document.getElementById('experience'));
			}
		}
	});
	
};