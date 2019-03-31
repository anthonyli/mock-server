import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ProjectList from 'com/Project/list'
import * as ProjectActions from '../../actions/ProjectActions'
import 'com/Project/index.less'

function mapStateToProps(state) {
  return {
    projectList: state.get('project').get('projectList')
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectActions, dispatch)
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList)
