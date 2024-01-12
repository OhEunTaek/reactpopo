import SubLayout from '../common/SubLayout';
import { useState, useEffect } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function Gallery() {
	const [Items, setItems] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Tag, setTag] = useState([]);
	// const [Show, setShow] = useState(false);

	const getFlickr = async (opt) => {
		const key = 'fc53ebefe80f178c0979785406ddb3d5';
		const num = 100;
		const extras = 'tags, description, views';
		const method_search = 'flickr.photos.search';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';

		let url = '';
		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&extras=${extras}&format=json&nojsoncallback=1`;
		}

		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&extras=${extras}&format=json&nojsoncallback=1&tags=${opt.tag}`;
		}

		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&extras=${extras}&format=json&nojsoncallback=1&tags1&user_id=${opt.owner}`;
		}

		await axios.get(url).then((json) => {
			if (json.data.photos.photo.length === 0)
				return alert('해당 검색어의 결과값이 없습니다.');
			setItems(json.data.photos.photo);
		});
	};

	const subtitle = {
		title: 'Work Life',
		p: 'Work Life is now a live event! Atlassian Presents: Work Life is happening Sept. 29th in San Francisco. Register for free.',
		flickr: Items.length,
		tag: Tag,
		show: getFlickr,
	};

	const imgOn = (i) => {
		const tags = Items[i].tags.length;

		return (
			<div className='wrap'>
				<div className='img-box'>
					<img
						src={`https://live.staticflickr.com/${Items[i].server}/${Items[i].id}_${Items[i].secret}_b.jpg`}
						alt={Items[i].title}
					/>
				</div>

				<div className='img-info'>
					<div className='avatar'>
						<img
							src={`http://farm${Items[i].farm}.staticflickr.com/${Items[i].server}/buddyicons/${Items[i].owner}.jpg`}
							alt={Items[i].owner}
							onError={(e) => {
								e.target.setAttribute(
									'src',
									'https://www.flickr.com/images/buddyicon.gif'
								);
							}}
						/>
					</div>

					<div className='info'>
						<h1 className='title'>{Items[i].title}</h1>
						<span
							className='owner'
							onClick={(e) => {
								getFlickr({ type: 'user', owner: e.target.innerText });
							}}
						>
							{Items[i].owner}
						</span>
						<strong className='views'>
							<FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
							{Items[i].views}
						</strong>
						<p>{Items[i].description._content.replace(/(<([^>]+)>)/gi, '')}</p>

						<span className='tags'>
							{tags !== 0
								? Items[i].tags.split(' ').map((tag, i) => {
										if (i >= 10) return;

										return (
											<span
												key={i}
												className='tag'
												onClick={(e) => {
													setTag(e.target.innerText);
													getFlickr({
														type: 'search',
														tag: `${e.target.innerText}`,
													});
												}}
											>
												{tag}
											</span>
										);
								  })
								: ''}
						</span>
					</div>
				</div>
			</div>
		);
	};

	useEffect(() => {
		getFlickr({ type: 'interest' });
	}, []);

	return (
		<SubLayout name='gallery' sub={subtitle}>
			<div className='show'>
				{Items[0] !== undefined ? (
					<article className='sticky'>{imgOn(Index)}</article>
				) : (
					' '
				)}
			</div>

			<div className='list'>
				{Items.map((item, i) => {
					return (
						<article
							key={i}
							className='flicker'
							onClick={() => {
								setIndex(i);
							}}
						>
							<div className='img-box'>
								<img
									src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
									alt={item.title}
								/>

								<div className='info'>
									<div className='avatar'>
										<img
											src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
											alt={item.owner}
											onError={(e) => {
												e.target.setAttribute(
													'src',
													'https://www.flickr.com/images/buddyicon.gif'
												);
											}}
										/>
									</div>
									<div className='info-text'>
										<p className='title'>{item.title}</p>
										<span>{item.owner}</span>
									</div>
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</SubLayout>
	);
}

export default Gallery;
