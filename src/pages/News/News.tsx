import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { INews } from '../../types';

//components
import { Container, Preloader } from '../../components';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Image, Badge } from 'react-bootstrap';
//

//media
import { News as NewsIcon } from '../../media';
//

//redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchNews } from '../../store/thunks/userThunks';
//

//locales
import { useTranslation } from 'react-i18next';
//

export default function News(){
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const news = useAppSelector((state) => state.user.news);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    if(!news) {
        return(
            <Preloader />
        );
    }

    if(news?.length === 0){
        return(
            <Container>
                {t('Новостей нет.')}
            </Container>
        );
    }

    const newsElementsRender = (value: INews) => (
        <VerticalTimelineElement
            key={value._id}
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'black' }}
            date={`${t('Дата')}: ${dayjs(value.date).format('DD.MM.YYYY')}`}
            iconStyle={{ background: 'indianred', color: '#fff' }}
            icon={<Image width="100%" height="100%" src={NewsIcon} />}
        >
            <h3 className="vertical-timeline-element-title">{value.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{value.subtitle}</h4>
            <p className="mb-3">
                {value.text}
            </p>
            <Badge bg="dark-custom">
                {t('Автор')}: <span style={{color: '#FFB319'}}>{value.author.login}</span>
            </Badge>
        </VerticalTimelineElement>
    );

    return(
        <Container>
           <VerticalTimeline>
               { news.map(newsElementsRender) }
            </VerticalTimeline>
        </Container>
    );
}