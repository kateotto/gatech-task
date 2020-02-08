import React, { Component } from 'react';
import styles from './PeopleList.module.css';
import Button from '../Button/Button';


const data = import('../../clients.json');
const gender_female = 'https://cdn3.iconfinder.com/data/icons/i-am-who-i-am/100/1-64.png'
const gender_male = 'https://cdn3.iconfinder.com/data/icons/i-am-who-i-am/100/2-64.png';

class PeopleList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          people: [],
          input: ''
        };
      }

    getPeople = async () => {
      const response = await data;
      const json = await response.default.data;
      this.setState({people: json});
    }

    sortByAge = (isAsc) => {
        const sortedPeople = this.sortPeople(this.state.people, 'age', isAsc);
        this.setState({
            people: sortedPeople
        });
    }

    sortAgeDesc = () => {
        this.sortByAge(false);
    }

    sortAgeAsc = () => {
        this.sortByAge(true);
    }

    sortByEmail = (isAsc) => {
        const sortedPeople = this.sortPeople(this.state.people, 'email', isAsc);
        this.setState({
            people: sortedPeople
        }); 
    }
    sortEmailDesc = () => {
        this.sortByEmail(false);
    }

    sortEmailAsc = () => {
        this.sortByEmail(true);  
    }

    componentDidMount(){
        document.getElementById('sortAgeDesc').addEventListener('click', this.sortAgeDesc);
        document.getElementById('sortAgeAsc').addEventListener('click', this.sortAgeAsc);
        document.getElementById('sortEmailDesc').addEventListener('click', this.sortEmailDesc);
        document.getElementById('sortEmailAsc').addEventListener('click', this.sortEmailAsc);
        this.getPeople();
    }
    
    sortPeople = (people, sortingParam, isSortingAsc) => {
        const sorted = people.sort((personA, personB) => {
            const paramA = personA[sortingParam];
            const paramB = personB[sortingParam];
            if (typeof paramA === 'number' && typeof paramB === 'number') {
                return isSortingAsc ? paramA - paramB : paramB - paramA;
            }
            else {
                const isParamAFirst = paramA > paramB;
                return isSortingAsc === isParamAFirst ? 1 : -1;
            }
        });
        return sorted;
    }

    onInputHandler = (e) => {
       let inputData = e.target.value;
        this.setState({
          input: inputData,
        })
      }


    render() {
        let filteredPeople = this.state.people.filter((person) => 
            {
                let searchedPeople = person.name.toUpperCase().search(this.state.input.toUpperCase());
                return searchedPeople  !== -1;
            }
        );
        return (
           <div className={styles.wrapper}>
               <div>
                    <input 
                     type="text" 
                     value={this.state.input} 
                     onChange={this.onInputHandler}
                     className={styles.input}
                     placeholder="SZUKAJ"
                     />
               </div>
               <div>
                <Button id="sortAgeAsc" text="Wiek rosnąco" />
                <Button id="sortAgeDesc" text="Wiek malejąco" />
                <Button id="sortEmailAsc" text="Email A-Z" />
                <Button  id="sortEmailDesc" text="Email Z-A" />
               </div>
               {filteredPeople.length > null 
               ? 
                (filteredPeople.map ((person, index) => {
                    return (
                        <div key={index}>
                            <div className={styles.listContainer}>
                                <div>
                                <img 
                                    src={person.avatar} 
                                    alt={person.name}
                                    className={styles.avatar} 
                                    />
                                </div>
                                <div><b>ID: </b>{person._id}</div>
                                <div><b>Imię i nazwisko: </b>{person.name}</div>
                                <div><b>Wiek: </b> {person.age}</div>
                                <div><b>Email: </b>{person.email}</div>
                                <div className={styles.gender}>
                                    <b>Płeć: </b>
                                    <img 
                                    src={person.sex ? gender_female : gender_male} 
                                    alt={person.sex ? 'kobieta' : 'mężczyzna'}
                                    />
                                </div>
                                <div><b>Miasto: </b>{person.address.city}</div>
                                <div>
                                    <b>Adres: </b>
                                    {person.address.street} {person.address.houseNumber}
                                </div>
                            </div> 
                </div>)
               }))
               : 
                <div>Nie znaleziono wyników</div>
               }
           </div>
        )
    }
}
export default PeopleList;