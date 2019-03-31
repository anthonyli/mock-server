import { connect } from 'react-redux'
import MoveCategory from 'com/Project/moveCategory'
import { moveApiCategory, closeMoveCategory, saveApiCategory } from '../../actions/ProjectActions'

function mapStateToProps(state) {
  const project = state.get('project')
  return {
    doc: project.get('apiDocMove'),
    categoryList: project.get('projectDetail').get('Category'),
    showMoveModal: project.get('showMoveModal')
  }
}
function mapDispatchToProps(dispatch) {
  return {
    moveApiCategory: doc => dispatch(moveApiCategory(doc)),
    closeCategoryModal: () => dispatch(closeMoveCategory()),
    saveApiCategory: doc => dispatch(saveApiCategory(doc))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveCategory)
