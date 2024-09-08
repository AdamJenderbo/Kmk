import { connect } from 'react-redux';
import { UploadImagePage } from '../../pages/images/UploadImagePage';
import { getAlbums } from '../../actions/album';
import { uploadImage } from '../../actions/image';

const mapStateToProps = state => {
    return {
        albumOptions: state.album.albums.map(album => ({
            value: album.id, 
            text: album.title
        }))
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAlbums: () => dispatch(getAlbums()),
        uploadImage: (albumId, image) => dispatch(uploadImage(albumId, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImagePage)