import { connect } from 'react-redux';
import { getAlbums } from '../../actions/album';
import { AlbumsPage } from '../../pages/images/AlbumsPage';
import { getImage } from '../../actions/image';

const mapStateToProps = state => {
    return {
        albums: state.album.albums
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAlbums: () => dispatch(getAlbums()),
        getImage: () => dispatch(getImage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPage)