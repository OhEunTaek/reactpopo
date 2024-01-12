import SubLayout from '../common/SubLayout';
import Pop from '../common/Pop';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Youtube() {
	const [Videos, setVideos] = useState([]);
	const [Show, setShow] = useState(false);
	const [Index, setIndex] = useState(0);

	const subtitle = {
		title: 'Trello Views',
		p: 'Trusted by millions, Trello is the visual collaboration tool that creates a shared perspective on any project.',
		count: Videos.length,
	};

	useEffect(() => {
		const key = 'AIzaSyDSdFyxbZ_BnbSiuPS3M6Ug9mM75LfRyJg';
		const playList = 'PL_zwLMPR5YRLPV-Ni5MG2mds5p6RwupoD';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playList}&maxResults=${num}`;

		axios.get(url).then((json) => {
			setVideos(json.data.items);
		});
	}, []);

	return (
		<SubLayout name={'youtube'} sub={subtitle}>
			{Videos.map((item, i) => {
				return (
					<article
						key={i}
						onClick={() => {
							setShow(true);
							setIndex(i);
						}}
					>
						<div className='thum'>
							<span className='icon'>
								<FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
							</span>
							<img
								src={item.snippet.thumbnails.high.url}
								alt={item.snippet.title}
							/>
						</div>

						<div className='desc'>
							<strong className='owner'>
								{item.snippet.videoOwnerChannelTitle}
							</strong>
							<h3 className='title'>{item.snippet.title}</h3>
							<p>{item.snippet.description}</p>
							<span className='time'>
								{item.snippet.publishedAt.split('T')[0].replace(/-/gi, '.')}
							</span>
						</div>
					</article>
				);
			})}

			{Show && (
				<Pop close={setShow}>
					<div className='video'>
						<iframe
							title='youtube'
							src={`https://www.youtube.com/embed/${Videos[Index].snippet.resourceId.videoId}`}
							frameborder='0'
						></iframe>
					</div>
				</Pop>
			)}
		</SubLayout>
	);
}

export default Youtube;
