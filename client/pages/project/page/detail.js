import { connect } from 'react-redux'
import ProjectDetail from 'com/Project/detail'
import {
  getProjectDetail,
  editApiCategory,
  setCategoryTabKey,
  moveApiCategory,
  importSwagger
} from '../../actions/ProjectActions'
import { editApiDoc, delApiDoc, copyApiDoc, getProjectList } from '../../actions/DocActions'
import 'com/Project/index.less'

function mapStateToProps(state) {
  return {
    activeKey: state.get('project').get('activeKey'),
    project: state.get('project').get('projectDetail')
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getProjectDetail: pid => dispatch(getProjectDetail(pid)),
    editApiCategory: category => dispatch(editApiCategory(category)),
    editApiDoc: doc => dispatch(editApiDoc(doc)),
    copyApiDoc: doc => dispatch(copyApiDoc(doc)),
    getProjectList: doc => dispatch(getProjectList(doc)),
    delApiDoc: id => dispatch(delApiDoc(id)),
    setCategoryTabKey: key => dispatch(setCategoryTabKey(key)),
    moveCategory: doc => dispatch(moveApiCategory(doc)),
    importSwagger: pid => dispatch(importSwagger(pid))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail)
