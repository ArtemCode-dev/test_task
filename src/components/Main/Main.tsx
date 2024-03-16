import { Component } from 'react'
import ReviewCard from '../UI/ReviewCard/ReviewCard';
import s from './Main.module.scss'
import { connect } from 'react-redux';
import { IMainState, setReviews } from '../../store/slices/main-slice';
import { Review } from '../../types/users';

type reviewItem = {
    date: string;
    name: string;
    review: string;
}

interface Props {
    setReviews: (reviews: Array<{ data: Review[] }>) => void;
    reviews:  { data: Review[] }[];
    language: 'ru' | 'en';
}

interface State {
    data: Review[],
    currentPage: number,
    itemsPerPage: number,
}

export class Main extends Component<Props, State> {
    state = {
        data: [],
        currentPage: 1,
        itemsPerPage: 10,
    }
    componentDidMount(): void {
        Promise.all([
            fetch('http://localhost:3000/ru').then(res => res.json()),
            fetch('http://localhost:3000/en').then(res => res.json())
        ])
        .then(([dataRu, dataEn]) => {
            const arr = [
                { data: Object.values(dataRu) },
                { data: Object.values(dataEn) }
            ];
            this.props.setReviews(arr as { data: Review[] }[]);
            this.setState({ data: Object.values(dataEn) });
        })
        .catch(err => console.log(err));
    }
  render() {
    
    const { data, currentPage, itemsPerPage } = this.state;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = this.props.reviews[0] && this.props.reviews[this.props.language == 'ru' ? 0 : 1].data.slice(firstItem, lastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className={s.main}>
            {this.props.reviews[0] && currentItems.map((item:reviewItem) => (
                <ReviewCard date = {item.date} name = {item.name} review = {item.review}/>
            ))}
            <div>
                {pageNumbers.map(number => (
                    // извиняюсь за inline styles
                    <button key={number} style={{backgroundColor: number == this.state.currentPage ? 'green' : 'white'}} onClick={() => this.setState({ currentPage: number })}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state:{mainSlice : IMainState}) => {
    return {
        reviews: state.mainSlice.reviews,
        language: state.mainSlice.language
    };
};

const mapDispatchToProps = {setReviews}

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);
export default ConnectedMain;