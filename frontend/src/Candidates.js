import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'

import Candidate from './Candidate.js'

const styles = {
  root: {
      display: 'flex',
      marginTop: 80
  },
}

class Candidates extends Component {
    state = {candidates: [], categories: []}
    
    componentDidMount() {
        fetch('/api/candidates')
        .then(res => res.json())
        .then(candidates => {
        	//this.setState({candidates: candidates})
            
            fetch('/api/categories')
            .then(res => res.json())
            .then(categories => {
            	this.setState({candidates: candidates, categories: categories})
            });
        });
        
        /*fetch('/api/categories')
        .then(res => res.json())
        .then(res => {
            console.log(res)
        	this.setState({categories: res})
        });*/
        
        /*this.setState({
            candidates: [
                {id: 0, name: "Jack Proudfoot", age: 45, position: "President", party: "Democrat", picture: "./img/mauriciofunes.png", approval: 4, ratings: [{category: 0, ranking: 4}, {category: 1, ranking: 3}, {category: 2, ranking: 1}]},
                {id: 1, name: "Eddy Lin", age: 45, position: "Senator", party: "Republican", picture: "./img/mauriciofunes.png", approval: 3, ratings: [{category: 0, ranking: 5}, {category: 1, ranking: 1}, {category: 2, ranking: 3}]},
                {id: 2, name: "Siddarth Madala", position: "Mayor", party: "Independent", age: 45, picture: "./img/mauriciofunes.png", approval: 1, ratings: [{category: 0, ranking: 1}, {category: 1, ranking: 2}, {category: 2, ranking: 1}]},
            ],
            categories: [
                {id: 0, category: "Transparancy"},
                {id: 1, category: "Gender Justice"},
                {id: 2, category: "Environmentalism"}
            ]
    
        });*/
        
    }
    
    render() {
        
        var candidates = []
        for (var i = 0; i < this.state.candidates.length; i++) {
            var candidate = this.state.candidates[i];
            var candidateRankings = undefined;
            
            if (this.props.user !== undefined) {
                candidateRankings = this.props.user.ratings.find(obj => obj.candidate === candidate._id);
            }
            
            candidates.push(<Grid item key={i}><Candidate data={candidate} categories={this.state.categories} user={this.props.user} userRatings={candidateRankings}/></Grid>);
        }
        
        return (
            <div className={this.props.classes.root}>
                <Grid container justify="center">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <Grid container justify="flex-start">
                            {candidates}
                            
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Candidates.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Candidates);