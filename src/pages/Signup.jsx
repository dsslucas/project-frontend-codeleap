import React, { Component } from 'react'

import { Navigate } from "react-router-dom";

// Redux
import { connect } from 'react-redux';
import { changeNickname } from '../actions/publishActions';
import { bindActionCreators } from 'redux';

// Material UI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';

//Styles
import './Signup.css'

class Signup extends Component {

    state = { username: '', check: false }

    render() {
        //Redirect to the next page
        //const navigate = useNavigate()

        const { username, check } = this.state

        const { changeNickname } = this.props;

        const nextStep = () => {
            if (username.length > 0) {
                changeNickname(username);
                this.setState({ check: true })
                console.log("Entrei aqui")
            }
        }

        return (
            <Container 
                style={{
                    maxWidth: '500px',
                    overflowY: 'hidden',
                }}
            >
                <Grid
                    container spacing={0}
                    style={{
                        paddingTop: '1.75rem',
                        paddingLeft: '2rem',
                        paddingRight: '1.563rem'
                    }}
                >
                    <Grid item xs={12}>
                        <h1>Welcome to CodeLeap Network!</h1>
                    </Grid>

                    <Grid item xs={12}>
                        <label>Please enter your username</label>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                    </Grid>

                    <Grid 
                        item xs={12}
                        style={{
                            display: 'flex',
                            justifyContent: 'right'
                        }}                    
                    >
                        <Button
                            onClick={() => nextStep()}
                            style={{ 
                                background: (username.length === 0 ? '#555555' : '#000000'),
                                color: '#ffffff',
                                width: '6.938rem',
                                marginTop: '1.688rem',
                                marginBottom: '1.875rem'
                            }}
                            disabled={username.length === 0 ? true : false}
                        >
                            ENTER
                        </Button>
                    </Grid>
                </Grid>

                {check && (
                    <Navigate to="/home" replace={true} />
                )}
            </Container>
        )
    }
}

const mapStateToProps = store => ({
    username: store.publish.username
})

const mapDispatchToProps = dispatch => bindActionCreators({ changeNickname }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);