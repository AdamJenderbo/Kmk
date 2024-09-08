import { connect } from 'react-redux';
import { getAlbum } from '../../actions/album';
import { AlbumPage } from '../../pages/images/AlbumPage';

const mapStateToProps = state => {
    return {
        album: state.album.album
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAlbum: (id) => dispatch(getAlbum(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage)