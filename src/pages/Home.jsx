import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { post, patch, del } from '../actions/publishActions'

// Icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

//Material UI
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

// Styles
import './Home.css'
import moment from 'moment'
import { bindActionCreators } from 'redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// URL for GET
const URL = 'https://dev.codeleap.co.uk/careers/'

class Home extends Component {
    // Variables in portuguese.
    state = {
        titulo: '',
        conteudo: '',
        listGetRequest: [],
        dialogEdit: false,
        dialogDelete: false,
        idPostSelected: ''
    };

    render() {
        const { username } = this.props

        //Variables on Portuguese, just for manipulate with Redux
        const { titulo, conteudo, listGetRequest, dialogEdit, dialogDelete, idPostSelected } = this.state

        // POST method, which send to Actions
        const nextStep = () => {
            if (titulo.length > 0 && conteudo.length > 0) {
                post({ ...this.state, username })
                this.setState({ titulo: '', conteudo: '' })
            }
        }

        // DELETE method
        const deletePost = () => {
            del({ ...this.state, idPostSelected })
            this.setState({
                dialogDelete: false,
                titulo: '',
                conteudo: ''
            })
        }

        // PATCH method
        const patchPost = () => {
            patch({ ...this.state, idPostSelected })

            this.setState({
                dialogEdit: false,
                titulo: '',
                conteudo: ''
            })
        }

        // GET method
        const sendGetRequest = async () => {
            try {
                await axios.get(URL).then(resp => this.setState({ listGetRequest: resp.data.results }))
            } catch (err) {
                console.log(err)
            }
        }

        sendGetRequest()

        // Button changes when clicked
        const EditButton = (id) => {
            this.setState({
                dialogEdit: true,
                idPostSelected: id,
            })
        }

        const DeleteButton = (id) => {
            this.setState({
                dialogDelete: true,
                idPostSelected: id,
            })
        }

        return (
            <Container
                fixed
                style={{
                    paddingLeft: '0',
                    paddingRight: '0'
                }}
            >

                {dialogDelete && (
                    <Dialog
                        open={dialogDelete}
                        onClose={() => this.setState({ dialogDelete: false })}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this item?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button
                                onClick={() => this.setState({ dialogDelete: false })}
                                variant="outlined"
                                style={{ color: '#000000' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => deletePost()} autoFocus
                                variant="outlined"
                                style={{ color: '#000000' }}
                            >
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}

                {dialogEdit && (
                    <Dialog
                        open={dialogEdit}
                        onClose={() => this.setState({ dialogEdit: false })}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Edit item
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Title
                            </DialogContentText>

                            <TextField
                                margin="dense"
                                id="title"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => this.setState({ titulo: e.target.value })}
                            />

                            <DialogContentText id="alert-dialog-description">
                                Content
                            </DialogContentText>

                            <TextField
                                margin="dense"
                                id="title"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => this.setState({ conteudo: e.target.value })}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => patchPost()}
                                disabled={(titulo.length === 0 || conteudo.length === 0) ? true : false}
                                style={{
                                    width: '111px', color: '#ffffff',
                                    background: ((titulo.length === 0 || conteudo.length === 0) ? '#555555' : '#000000')
                                }}
                            >
                                SAVE
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}

                <header>
                    <h3>CodeLeap Network</h3>
                </header>

                {username.length === 0 && (
                    alert("We need your username to publish. We will redirect you for the Sign in."),
                    <Navigate to="/signin" replace={true} />
                )}

                <section>
                    <div className='post-box'>
                        <Grid>
                            <Grid xs={12}>
                                <h4>What's on your mind?</h4>
                            </Grid>

                            <Grid xs={12}>
                                <label>Title</label>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => this.setState({ titulo: e.target.value })}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <label>Content</label>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => this.setState({ conteudo: e.target.value })}
                                />
                            </Grid>

                            <Grid xs={12} style={{display: 'flex', justifyContent: 'right'}}>
                                <Button
                                    variant="contained"
                                    onClick={() => nextStep()}
                                    disabled={titulo.length === 0 || conteudo.length === 0 ? true : false}
                                    style={{ 
                                        marginTop: '2.188rem',
                                        marginBottom: '1.813rem',
                                        color: '#ffffff',
                                        background: ((titulo.length === 0 || conteudo.length === 0) ? '#555555' : '#000000'),
                                        width: '6.938rem'
                                    }}
                                >
                                    CREATE
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </section>

                {listGetRequest.map((list) => {
                    return (
                        <section key={list.id} className="content-list">

                            <Grid
                                container spacing={0}
                                style={{ background: '#000000', alignItems: 'center', color: '#ffffff' }}
                            >
                                <Grid item xs={9} md={10}>
                                    <h4
                                        style={{ marginLeft: '1.875rem' }}
                                    >{list.title}</h4>
                                </Grid>

                                {list.username === username && (
                                    <>
                                        <Grid
                                            item xs={1} md={1}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'right'
                                            }}
                                        >
                                            <Button
                                                onClick={() => DeleteButton(list.id)}
                                                style={{
                                                    color: '#ffffff'
                                                }}
                                            >
                                                <DeleteForeverIcon />
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item xs={1} md={1}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Button
                                                onClick={() => EditButton(list.id)}
                                                style={{ color: '#ffffff' }}
                                            >
                                                <EditIcon />
                                            </Button>
                                        </Grid>
                                    </>
                                )}
                            </Grid>

                            <Grid
                                container spacing={0}
                                style={{
                                    paddingTop: '1.438rem',
                                    paddingLeft: '1.875rem',
                                    paddingRight: '1.563rem'
                                }}
                            >
                                <Grid item xs={6}>
                                    <span>
                                        @{list.username}
                                    </span>
                                </Grid>

                                <Grid item xs={6}>
                                    <span
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'right'
                                        }}
                                    >
                                        {
                                            moment(new Date(list.created_datetime)).fromNow()
                                        }
                                    </span>
                                </Grid>

                                <Grid item xs={12}>
                                    <p>{list.content}</p>
                                </Grid>
                            </Grid>
                        </section>
                    )
                })}
            </Container>
        )
    }
}

const mapStateToProps = store => ({
    username: store.publish.username,
    content: store.publish.content,
    title: store.publish.title,
})

const mapDispatchToProps = dispatch => bindActionCreators({ post }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);